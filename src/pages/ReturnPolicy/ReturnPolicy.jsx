import PolicyPage, { P, Ul, Li, H3 } from "@/components/common/PolicyPage";

const sections = [
  {
    id: "eligibility",
    title: "Return Eligibility",
    content: (
      <>
        <P>
          A product may be eligible for a return, replacement, or refund where:
        </P>
        <Ul>
          <Li>The product arrived damaged.</Li>
          <Li>The product is defective.</Li>
          <Li>The wrong product was delivered.</Li>
          <Li>The product materially differs from the confirmed order.</Li>
          <Li>
            The product has a manufacturing defect covered under the applicable
            warranty.
          </Li>
        </Ul>
        <P>
          The product should generally be returned in the applicable original
          condition and packaging, including accessories and components supplied
          with the order.
        </P>
      </>
    ),
  },
  {
    id: "damaged",
    title: "Damaged Products",
    content: (
      <>
        <P>
          Customers should inspect their package and product immediately after
          delivery. If the package or product appears damaged:
        </P>
        <Ul>
          <Li>
            Take clear photographs of the outer packaging before opening it.
          </Li>
          <Li>Take clear photographs and/or videos of the damaged product.</Li>
          <Li>Keep the original packaging and shipping materials.</Li>
          <Li>Contact Swashine as soon as possible.</Li>
          <Li>Provide your order number.</Li>
          <Li>Provide the requested photographs and/or videos.</Li>
        </Ul>
        <P>
          We may request additional information or evidence to investigate the
          claim.
        </P>
      </>
    ),
  },
  {
    id: "wrong-product",
    title: "Wrong Product Received",
    content: (
      <>
        <P>
          If you receive a product different from the product ordered, please
          contact us with order number, customer name, photograph of the product
          received, photograph of the shipping label, and relevant product
          details. After verification, Swashine may arrange an appropriate
          replacement or other resolution.
        </P>
      </>
    ),
  },
  {
    id: "defective",
    title: "Defective Products",
    content: (
      <>
        <P>
          If your Glowbox has a manufacturing defect, please contact our support
          team. We may request order number, photographs, video demonstrating
          the issue, product information, and additional information required to
          diagnose the problem.
        </P>
        <P>
          After reviewing the issue, Swashine may, depending on the
          circumstances: repair the product, replace the affected component,
          replace the product, or provide another appropriate resolution.
        </P>
      </>
    ),
  },
  {
    id: "customized",
    title: "Customized and Personalized Products",
    content: (
      <>
        <P>
          Some Swashine Glowboxes may be customized or personalized according to
          customer-selected specifications. Because customized products are
          produced specifically for the customer, customized and personalized
          products are generally not eligible for return or refund due to change
          of mind, personal preference, or incorrect customer-provided
          information.
        </P>
        <P>
          Customers are responsible for carefully reviewing names, text, logos,
          images, artwork, colors, sizes, design instructions, and other
          customization information before confirming their order. Once
          production or customization has started, changes may not be possible.
        </P>
        <P>
          If a customized product is defective, damaged during shipping,
          incorrectly manufactured, or different from the confirmed
          customization, please contact Swashine so that we can review the
          issue.
        </P>
      </>
    ),
  },
  {
    id: "change-of-mind",
    title: "Change of Mind",
    content: (
      <P>
        Returns due to change of mind may not be accepted. This is particularly
        applicable to customized or personalized products that have already
        entered production. For standard, non-customized products, return
        requests may be considered based on the applicable product condition and
        return requirements.
      </P>
    ),
  },
  {
    id: "period",
    title: "Return Request Period",
    content: (
      <P>
        Eligible return or replacement requests should be submitted within the
        return period communicated for the applicable order. The return period
        generally begins from the date the order is marked as delivered by the
        shipping carrier. Any applicable product-specific return period or
        warranty period communicated at the time of purchase will take
        precedence where appropriate.
      </P>
    ),
  },
  {
    id: "conditions",
    title: "Return Conditions",
    content: (
      <>
        <P>
          Products submitted for return should generally be in the required
          condition for the applicable claim, include the original packaging
          where applicable, include accessories and components, include relevant
          order information, and not have been damaged through misuse or
          negligence.
        </P>
        <P>
          A return, replacement, or warranty claim may not be accepted where
          damage resulted from misuse, accidental damage, negligence,
          unauthorized modification or repair, improper installation, storage or
          handling, or electrical conditions outside recommended specifications.
        </P>
      </>
    ),
  },
  {
    id: "shipping",
    title: "Return Shipping",
    content: (
      <P>
        Where a return is approved because of manufacturing defect, incorrect
        product, shipping damage, or Swashine fulfillment error, Swashine may
        arrange or reimburse reasonable return shipping costs according to the
        circumstances. For other approved returns, the customer may be
        responsible for return shipping costs. Do not send a product back
        without receiving return instructions from Swashine.
      </P>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    content: (
      <P>
        Once an approved returned product has been received and inspected,
        Swashine will determine whether the product qualifies for a refund.
        Where a refund is approved, it will generally be processed through the
        original payment method where possible. Timing depends on bank, card
        issuer, payment gateway, and financial institution. Shipping charges may
        not be refundable unless required by applicable law or where the refund
        is due to an error attributable to Swashine.
      </P>
    ),
  },
  {
    id: "partial",
    title: "Partial Refunds",
    content: (
      <P>
        A partial refund may be considered where only part of an order is
        affected, a component is defective or missing, the issue can be resolved
        without returning the complete product, or another mutually agreed
        resolution is appropriate.
      </P>
    ),
  },
  {
    id: "non-returnable",
    title: "Non-Returnable Products",
    content: (
      <>
        <P>
          Unless otherwise required by applicable law, the following may not be
          eligible for return:
        </P>
        <Ul>
          <Li>Customized products</Li>
          <Li>Personalized products</Li>
          <Li>
            Products manufactured according to customer-specific specifications
          </Li>
          <Li>Products damaged through misuse</Li>
          <Li>Products modified or repaired without authorization</Li>
          <Li>Products returned without prior approval</Li>
          <Li>Products missing essential components</Li>
          <Li>Products outside the applicable return or warranty period</Li>
        </Ul>
      </>
    ),
  },
  {
    id: "cancellation",
    title: "Order Cancellation",
    content: (
      <P>
        If you need to cancel an order, contact Swashine as soon as possible.
        Cancellation may not be possible once production or customization has
        started, the product has been packed, or the order has been shipped.
        Customized orders may have additional cancellation restrictions. If
        cancellation is approved, any applicable refund will be processed
        according to this policy.
      </P>
    ),
  },
  {
    id: "exchange",
    title: "Exchange or Replacement",
    content: (
      <P>
        Where applicable, Swashine may offer a replacement instead of a refund.
        Replacement availability may depend on product availability, nature of
        the defect, product condition, customer location, shipping requirements,
        and applicable warranty terms.
      </P>
    ),
  },
  {
    id: "how-to-request",
    title: "How to Request a Return or Refund",
    content: (
      <>
        <P>
          To request a return, replacement, or refund, contact us with order
          number, customer name, registered email or phone number, reason for
          the request, photographs/videos where applicable, and any other
          information requested by our support team.
        </P>
      </>
    ),
  },
  {
    id: "changes",
    title: "Policy Changes",
    content: (
      <P>
        Swashine may update this Return & Refund Policy from time to time. Any
        changes will be published on this page with a revised Last Updated date.
      </P>
    ),
  },
  {
    id: "notice",
    title: "Important Notice",
    content: (
      <P>
        Nothing in this policy is intended to limit any rights or remedies that
        cannot legally be excluded under applicable law.
      </P>
    ),
  },
];

export default function ReturnPolicy() {
  return (
    <PolicyPage
      title="Return & Refund Policy"
      intro={
        <>
          <P>Thank you for choosing Swashine.</P>
          <P>
            Swashine, operated by Swastik Industries, manufactures and sells LED
            Glowboxes and related products. Because some of our products may be
            customized or personalized according to customer requirements,
            return and refund eligibility may vary depending on the product and
            reason for the request. Please carefully review this policy before
            placing an order.
          </P>
        </>
      }
      sections={sections}
    />
  );
}
