import Head from "next/head";

export default function TermsPolicy() {
  return (
    <>
      <Head>
        <title>Terms Policy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Refund Policy</h1>
        <p>
          This is a placeholder Terms and Conditions Policy page required for Razorpay KYC
          verification. Actual policy content will be updated once the payment
          gateway goes live.
          <a href="https://merchant.razorpay.com/policy/RHtzMB14X7FJ01/terms">Click here to see</a>
        </p>
      </main>
    </>
  );
}
