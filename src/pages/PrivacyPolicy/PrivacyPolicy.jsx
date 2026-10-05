import PolicyPage, { P, Ul, Li, H3 } from "@/components/common/PolicyPage";

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <P>
          When you visit our website, place an order, contact us, or interact
          with our services, we may collect information necessary to provide our
          products and services.
        </P>
        <H3>1.1 Personal Information</H3>
        <P>Depending on how you interact with us, we may collect:</P>
        <Ul>
          <Li>Full name</Li>
          <Li>Email address</Li>
          <Li>Mobile number</Li>
          <Li>Billing address</Li>
          <Li>Shipping address</Li>
          <Li>Business or company information</Li>
          <Li>GST information, where applicable</Li>
          <Li>Order details</Li>
          <Li>Product customization information</Li>
          <Li>Information submitted through customer support</Li>
          <Li>Other information you voluntarily provide to us</Li>
        </Ul>
        <H3>1.2 Payment Information</H3>
        <P>
          Payments may be processed through third-party payment providers.
          Swashine does not generally store complete credit card, debit card,
          banking credentials, or other sensitive payment credentials on its own
          servers. Payment information may be processed directly by the
          applicable payment provider in accordance with its privacy and
          security practices.
        </P>
        <H3>1.3 Automatically Collected Information</H3>
        <P>
          When you browse our website, certain technical information may be
          automatically collected, including:
        </P>
        <Ul>
          <Li>IP address</Li>
          <Li>Browser type</Li>
          <Li>Device type</Li>
          <Li>Operating system</Li>
          <Li>Pages visited</Li>
          <Li>Referring pages</Li>
          <Li>Date and time of visits</Li>
          <Li>Website interaction information</Li>
          <Li>Cookies and similar technologies</Li>
        </Ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: (
      <>
        <P>We may use your information for the following purposes:</P>
        <Ul>
          <Li>Processing and fulfilling orders</Li>
          <Li>Processing payments</Li>
          <Li>Delivering products</Li>
          <Li>Providing order confirmations and updates</Li>
          <Li>Providing customer support</Li>
          <Li>
            Processing returns, refunds, replacements, and warranty claims
          </Li>
          <Li>Handling customized product requests</Li>
          <Li>Communicating with you regarding your orders</Li>
          <Li>Improving our website and services</Li>
          <Li>Improving customer experience</Li>
          <Li>Detecting and preventing fraud</Li>
          <Li>Preventing unauthorized activity</Li>
          <Li>Maintaining website security</Li>
          <Li>Maintaining business records</Li>
          <Li>Complying with applicable laws and regulations</Li>
        </Ul>
        <P>
          If you have opted to receive marketing communications, we may also use
          your contact information to send promotional offers, product updates,
          new product announcements, special offers, and other marketing
          communications. You may unsubscribe from marketing communications at
          any time.
        </P>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and Similar Technologies",
    content: (
      <>
        <P>
          Our website may use cookies, pixels, tags, and similar technologies.
          These technologies may help us keep products in your shopping cart,
          remember your preferences, understand how visitors use our website,
          improve website functionality and performance, analyze website
          traffic, and improve marketing and advertising.
        </P>
        <P>
          You may control or disable cookies through your browser settings.
          Disabling certain cookies may affect the functionality of some parts
          of our website.
        </P>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "Shopify and Third-Party Services",
    content: (
      <>
        <P>
          Our online store may use Shopify and other third-party services to
          operate our ecommerce platform and provide related services, including
          payment processing, shipping and logistics, website hosting,
          analytics, marketing, customer support, fraud prevention, and website
          functionality.
        </P>
        <P>
          These third-party service providers may process information necessary
          to provide their services. Their handling of your information may also
          be subject to their respective privacy policies and terms.
        </P>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Sharing of Information",
    content: (
      <>
        <P>
          We do not sell your personal information as a standalone product. We
          may share necessary information with trusted third parties, including
          payment processors, shipping and logistics providers, Shopify and
          related service providers, technology providers, analytics providers,
          marketing service providers, customer support providers, professional
          advisors, and government authorities where legally required.
        </P>
        <P>
          Information will only be shared where reasonably necessary to provide
          our services, complete transactions, operate our business, protect our
          rights, prevent fraud or abuse, or comply with applicable legal
          requirements.
        </P>
      </>
    ),
  },
  {
    id: "security",
    title: "Data Security",
    content: (
      <P>
        We take reasonable administrative, technical, and organizational
        measures to protect personal information against unauthorized access,
        unauthorized disclosure, misuse, alteration, loss, and destruction.
        However, no method of transmission over the internet or method of
        electronic storage can be guaranteed to be completely secure.
      </P>
    ),
  },
  {
    id: "retention",
    title: "Data Retention",
    content: (
      <P>
        We retain personal information for as long as reasonably necessary for
        completing transactions, providing customer support, maintaining
        business records, processing warranty claims, resolving disputes,
        preventing fraud, and meeting legal, tax, accounting, and regulatory
        requirements. When information is no longer required, we may securely
        delete or anonymize it where appropriate.
      </P>
    ),
  },
  {
    id: "rights",
    title: "Your Privacy Rights",
    content: (
      <>
        <P>
          Depending on applicable law, you may have rights regarding your
          personal information, including the ability to:
        </P>
        <Ul>
          <Li>Request access to personal information we hold about you</Li>
          <Li>Request correction of inaccurate information</Li>
          <Li>Request deletion of information where legally permitted</Li>
          <Li>Withdraw consent where processing is based on consent</Li>
          <Li>Opt out of marketing communications</Li>
          <Li>
            Raise concerns regarding the processing of your personal information
          </Li>
        </Ul>
        <P>
          To make a privacy-related request, please contact us using the details
          provided below.
        </P>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's Privacy",
    content: (
      <P>
        Our website is not intended to knowingly collect personal information
        from children without appropriate consent where required by applicable
        law. If you believe that a child has provided personal information to us
        improperly, please contact us so that we can take appropriate action.
      </P>
    ),
  },
  {
    id: "third-party-sites",
    title: "Third-Party Websites",
    content: (
      <P>
        Our website may contain links to third-party websites, applications, or
        services. Swashine is not responsible for the privacy practices,
        content, security, or policies of third-party websites. We recommend
        reviewing the privacy policies of third-party websites before providing
        them with personal information.
      </P>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    content: (
      <P>
        We may update this Privacy Policy from time to time to reflect changes
        in our business, services, technology, legal requirements, or privacy
        practices. Any updated version will be published on this page with a
        revised Last Updated date.
      </P>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    content: (
      <P>
        If you have questions, concerns, or requests regarding this Privacy
        Policy, please contact us using the contact details at the bottom of
        this page.
      </P>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro={
        <>
          <P>
            At Swashine, a brand operated by Swastik Industries, we respect your
            privacy and are committed to protecting the personal information you
            provide when you visit or purchase products through our website.
          </P>
          <P>
            This Privacy Policy explains how we collect, use, store, and protect
            your information when you use www.swashine.com and our related
            services.
          </P>
        </>
      }
      sections={sections}
    />
  );
}
