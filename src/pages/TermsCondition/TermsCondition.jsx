import PolicyPage, { P, Ul, Li } from "@/components/common/PolicyPage";

const sections = [
  {
    id: "about",
    title: "About Swashine",
    content: (
      <P>
        Swashine is a brand operated by Swastik Industries, offering LED
        Glowboxes and related products. Our products may be available as
        standard, customized, personalized, retail, or wholesale products.
        Product availability may vary from time to time.
      </P>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: (
      <>
        <P>By using our website or placing an order, you confirm that:</P>
        <Ul>
          <Li>
            You are legally capable of entering into a binding agreement under
            applicable law.
          </Li>
          <Li>The information you provide is accurate and complete.</Li>
          <Li>You will use the website only for lawful purposes.</Li>
          <Li>You will comply with these Terms & Conditions.</Li>
        </Ul>
      </>
    ),
  },
  {
    id: "website-use",
    title: "Website Use",
    content: (
      <>
        <P>You agree not to use the website to:</P>
        <Ul>
          <Li>Violate applicable laws</Li>
          <Li>Commit fraud</Li>
          <Li>Attempt unauthorized access</Li>
          <Li>Interfere with website operation</Li>
          <Li>Introduce malicious software</Li>
          <Li>Scrape or extract website data through unauthorized methods</Li>
          <Li>Impersonate another person or business</Li>
          <Li>Submit false or misleading information</Li>
          <Li>Abuse promotional offers</Li>
          <Li>Infringe intellectual property rights</Li>
        </Ul>
        <P>
          Swashine reserves the right to restrict or terminate access where we
          reasonably believe these Terms have been violated.
        </P>
      </>
    ),
  },
  {
    id: "product-info",
    title: "Product Information",
    content: (
      <P>
        We make reasonable efforts to ensure that product descriptions, images,
        specifications, dimensions, colors, prices, and other information are
        accurate. Minor variations may occur due to manufacturing, batches,
        materials, photography, display settings, or device characteristics.
        Colors on different devices may not exactly represent the physical
        product. Swashine reserves the right to correct errors and update
        product information when necessary.
      </P>
    ),
  },
  {
    id: "customized",
    title: "Customized and Personalized Products",
    content: (
      <P>
        Certain Swashine products may be customized according to customer
        requirements. Customers are responsible for reviewing all customization
        information before confirming an order, including names, text, logos,
        images, artwork, colors, dimensions, and design instructions. Once
        production or customization begins, changes or cancellations may not be
        possible.
      </P>
    ),
  },
  {
    id: "customer-content",
    title: "Customer-Provided Content",
    content: (
      <P>
        If you submit images, logos, artwork, text, or other content for
        customization, you confirm that you have the necessary rights to use
        such content. You agree not to submit content that infringes third-party
        rights, violates law or privacy, or contains unlawful or prohibited
        material. Swashine may refuse customization requests where we reasonably
        believe the submitted material may create legal or compliance concerns.
      </P>
    ),
  },
  {
    id: "pricing",
    title: "Pricing",
    content: (
      <P>
        Product prices displayed on the website may change without prior notice.
        Prices may include or exclude applicable taxes, shipping charges, and
        other fees depending on checkout configuration. The price presented
        during checkout generally applies to the order. If an obvious pricing or
        listing error occurs, Swashine may correct the error and, where
        appropriate, cancel the affected order.
      </P>
    ),
  },
  {
    id: "orders",
    title: "Orders",
    content: (
      <P>
        Submitting an order constitutes a request to purchase. Swashine reserves
        the right to accept or decline an order due to product availability,
        pricing errors, payment issues, suspected fraud, incorrect information,
        shipping limitations, customization issues, operational reasons, or
        other legitimate business reasons. If an order is cancelled after
        payment, any applicable refund will follow our Return & Refund Policy.
      </P>
    ),
  },
  {
    id: "payments",
    title: "Payments",
    content: (
      <P>
        Payments are processed through the methods available at checkout. You
        agree to provide valid payment and billing information. Swashine is not
        responsible for delays or failures caused by banks, payment gateways,
        card networks, or other third-party payment providers.
      </P>
    ),
  },
  {
    id: "shipping",
    title: "Shipping and Delivery",
    content: (
      <P>
        Swashine aims to dispatch and deliver orders within the estimated
        timeframe communicated during ordering. Delivery times may vary due to
        location, availability, customization, shipping provider, weather,
        holidays, transport disruptions, government restrictions, or other
        circumstances outside our reasonable control. Estimated dates are not
        guaranteed unless expressly stated otherwise.
      </P>
    ),
  },
  {
    id: "inspection",
    title: "Inspection on Delivery",
    content: (
      <P>
        Customers should inspect their package and product promptly after
        delivery. If damaged, take photographs/videos, keep original packaging,
        and contact Swashine as soon as possible. See our Return & Refund Policy
        for detailed requirements.
      </P>
    ),
  },
  {
    id: "returns",
    title: "Returns and Refunds",
    content: (
      <P>
        Returns, replacements, cancellations, and refunds are governed by our
        Return & Refund Policy. By placing an order, you acknowledge and agree
        to the applicable return and refund terms.
      </P>
    ),
  },
  {
    id: "warranty",
    title: "Warranty",
    content: (
      <P>
        Where a product is covered by a specific warranty, those terms govern
        the period, coverage, exclusions, and claim procedure. Unless expressly
        stated otherwise, warranty coverage may not include damage from misuse,
        accidents, negligence, improper installation, unauthorized modifications
        or repairs, electrical conditions outside recommended specifications,
        normal wear and tear, external physical damage, or improper handling or
        storage.
      </P>
    ),
  },
  {
    id: "ip",
    title: "Intellectual Property",
    content: (
      <P>
        Content owned or licensed by Swashine—including logos, branding, product
        photographs, graphics, text, designs, videos, website layout, and
        software—is protected by applicable intellectual property laws. You may
        not reproduce, copy, modify, distribute, publish, sell, or commercially
        exploit such content without prior written permission.
      </P>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    content: (
      <P>
        Our website may integrate with third-party services including Shopify,
        payment and shipping providers, analytics, marketing platforms, and
        customer support tools. Third-party services operate under their own
        terms and privacy policies. Swashine is not responsible for their
        independent practices.
      </P>
    ),
  },
  {
    id: "availability",
    title: "Website Availability",
    content: (
      <P>
        We aim to keep our website available but do not guarantee uninterrupted
        access. The website may occasionally be unavailable due to maintenance,
        updates, technical failures, hosting or security issues, network
        failures, or circumstances beyond our reasonable control.
      </P>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: (
      <P>
        To the maximum extent permitted by applicable law, Swashine will not be
        responsible for indirect, incidental, special, consequential, or
        punitive losses arising from the use of our website or products. Nothing
        in these Terms excludes liability that cannot legally be excluded under
        applicable law.
      </P>
    ),
  },
  {
    id: "force-majeure",
    title: "Force Majeure",
    content: (
      <P>
        Swashine will not be responsible for delays or failures caused by
        circumstances beyond our reasonable control, including natural
        disasters, flood, fire, epidemics, war, civil unrest, government
        restrictions, strikes, transportation or supplier disruptions, internet
        or infrastructure failures, and other unforeseen circumstances.
      </P>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    content: (
      <P>
        Your use of our website is also subject to our Privacy Policy, which
        explains how Swashine collects, uses, stores, and processes personal
        information.
      </P>
    ),
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    content: (
      <P>
        Swashine may update these Terms & Conditions from time to time. Updated
        Terms will be published on this page with a revised Last Updated date.
        Continued use of the website after an update may constitute acceptance
        of the updated Terms to the extent permitted by applicable law.
      </P>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <P>
        These Terms & Conditions shall be governed by the applicable laws of
        India. Disputes arising in connection with these Terms or your use of
        the website shall be subject to the jurisdiction of the appropriate
        courts having jurisdiction over the applicable Swashine business
        location, subject to applicable law.
      </P>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    content: (
      <P>
        For questions regarding these Terms & Conditions, please contact us
        using the details at the bottom of this page.
      </P>
    ),
  },
];

export default function TermsCondition() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      intro={
        <>
          <P>
            Welcome to Swashine, a brand operated by Swastik Industries. These
            Terms & Conditions govern your access to and use of
            www.swashine.com, including browsing the website, purchasing
            products, submitting customization information, and using related
            services.
          </P>
          <P>
            By accessing or using our website, you acknowledge that you have
            read, understood, and agree to these Terms & Conditions. If you do
            not agree with these Terms, please do not use our website.
          </P>
        </>
      }
      sections={sections}
    />
  );
}
