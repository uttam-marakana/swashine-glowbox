import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import { submitInquiry } from "@/services/contactService";
import { company } from "@/data/company";

const schema = Yup.object({
  name: Yup.string().required("Name is required").min(2, "Too short"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9+\-\s]{10,15}$/, "Enter a valid phone number"),
  email: Yup.string().email("Invalid email").nullable(),
  product: Yup.string().nullable(),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Please write a bit more"),
});

const initialValues = {
  name: "",
  phone: "",
  email: "",
  product: "",
  message: "",
};

export default function ContactForm() {
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setStatus(null);
    setErrorMsg("");
    const result = await submitInquiry({
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email?.trim() || "",
      product: values.product?.trim() || "",
      message: values.message.trim(),
      source: "website-contact-form",
    });

    setSubmitting(false);

    if (result.success) {
      setStatus("success");
      resetForm();
    } else {
      setStatus("error");
      setErrorMsg(
        result.error || "Something went wrong. Please try WhatsApp instead.",
      );
    }
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <Field name="name">
                {({ field }) => (
                  <Input
                    {...field}
                    label="Full Name *"
                    placeholder="Your Name"
                    error={touched.name && errors.name}
                  />
                )}
              </Field>
              <Field name="phone">
                {({ field }) => (
                  <Input
                    {...field}
                    label="Phone / WhatsApp *"
                    placeholder="+91 88xxxxxxxx"
                    error={touched.phone && errors.phone}
                  />
                )}
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Field name="email">
                {({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    error={touched.email && errors.email}
                  />
                )}
              </Field>
              <Field name="product">
                {({ field }) => (
                  <Input
                    {...field}
                    label="Product of interest"
                    placeholder="e.g. 18×24 Inch, Arch Glowbox"
                    error={touched.product && errors.product}
                  />
                )}
              </Field>
            </div>

            <Field name="message">
              {({ field }) => (
                <Textarea
                  {...field}
                  label="Message *"
                  placeholder="Tell us about size, quantity, city, or any special requirement..."
                  rows={5}
                  error={touched.message && errors.message}
                />
              )}
            </Field>

            {status === "success" && (
              <div className="rounded-2xl bg-green-500/15 border border-green-500/40 text-green-400 px-5 py-4 text-sm">
                Thank you! Your inquiry was saved. We will contact you soon on
                WhatsApp / phone.
              </div>
            )}

            {status === "error" && (
              <div className="rounded-2xl bg-red-500/15 border border-red-500/40 text-red-400 px-5 py-4 text-sm">
                {errorMsg}
                <div className="mt-2">
                  You can also reach us directly on{" "}
                  <a
                    href={`https://wa.me/${company.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-medium"
                  >
                    WhatsApp
                  </a>
                  .
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[180px]"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>
              <Button
                type="button"
                variant="whatsapp"
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent("Hi Swashine, I have an inquiry.")}`}
                className="min-w-[180px]"
              >
                Or WhatsApp Us
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
