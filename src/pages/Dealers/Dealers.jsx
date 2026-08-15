import { useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { company } from "@/data/company";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import { submitInquiry } from "@/services/contactService";

const schema = Yup.object({
  name: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  business: Yup.string().required("Required"),
  volume: Yup.string(),
  message: Yup.string(),
});

export default function Dealers() {
  const [status, setStatus] = useState(null);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
            B2B
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Dealer / Distributor
          </h1>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Partner with Swashine for trade pricing and recurring supply. Tell
            us your city and volume.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-4 text-sm text-zinc-400">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">Why partner</h3>
              <ul className="space-y-2">
                <li>• Manufacturer-direct from Rajkot</li>
                <li>• Custom sizes up to 2 × 6 ft</li>
                <li>• Arch, wall frames & battery table-tops</li>
                <li>• Trade support on WhatsApp</li>
              </ul>
            </div>
            <Button
              variant="whatsapp"
              className="w-full"
              href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                "Hi Swashine, I want to become a dealer / distributor.",
              )}`}
            >
              Chat on WhatsApp
            </Button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <h3 className="font-semibold text-lg mb-6">Dealer enquiry form</h3>
            <Formik
              initialValues={{
                name: "",
                phone: "",
                city: "",
                business: "",
                volume: "",
                message: "",
              }}
              validationSchema={schema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setStatus(null);
                const res = await submitInquiry({
                  ...values,
                  source: "dealer-enquiry",
                  product: "Dealer / Distributor",
                  message: [
                    values.business,
                    values.city,
                    values.volume,
                    values.message,
                  ]
                    .filter(Boolean)
                    .join(" | "),
                });
                setSubmitting(false);
                if (res.success) {
                  setStatus("success");
                  resetForm();
                } else {
                  setStatus("error");
                }
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field name="name">
                      {({ field }) => (
                        <Input
                          {...field}
                          label="Name *"
                          error={touched.name && errors.name}
                        />
                      )}
                    </Field>
                    <Field name="phone">
                      {({ field }) => (
                        <Input
                          {...field}
                          label="Phone *"
                          error={touched.phone && errors.phone}
                        />
                      )}
                    </Field>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field name="city">
                      {({ field }) => (
                        <Input
                          {...field}
                          label="City *"
                          error={touched.city && errors.city}
                        />
                      )}
                    </Field>
                    <Field name="business">
                      {({ field }) => (
                        <Input
                          {...field}
                          label="Business type *"
                          placeholder="Retail / Signage / Electrical"
                          error={touched.business && errors.business}
                        />
                      )}
                    </Field>
                  </div>
                  <Field name="volume">
                    {({ field }) => (
                      <Input
                        {...field}
                        label="Expected monthly volume"
                        placeholder="e.g. 20–50 units"
                      />
                    )}
                  </Field>
                  <Field name="message">
                    {({ field }) => (
                      <Textarea {...field} label="Message" rows={3} />
                    )}
                  </Field>
                  {status === "success" && (
                    <p className="text-green-400 text-sm">
                      Enquiry submitted. We will contact you soon.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-400 text-sm">
                      Could not save. Please use WhatsApp instead.
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Sending..." : "Submit dealer enquiry"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
