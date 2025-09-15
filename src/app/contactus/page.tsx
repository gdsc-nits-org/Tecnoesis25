import Head from "next/head";

export default function ContactPolicy() {
  return (
    <>
      <Head>
        <title>Contact Us Policy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Refund Policy</h1>
        <p>
          This is a placeholder contact us policy page required for Razorpay KYC
          verification. Actual policy content will be updated once the payment
          gateway goes live.
          <a href="https://merchant.razorpay.com/policy/RHtzMB14X7FJ01/contact_us">Click here to see</a>
        </p>
      </main>
    </>
  );
}
