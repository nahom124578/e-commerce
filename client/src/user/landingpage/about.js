import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Our Online Marketing Platform</h1>
        <p className="text-gray-700 leading-relaxed">
          Our Online Marketing Platform serves as a dynamic marketplace connecting buyers and sellers across various industries. Designed with a focus on user experience and efficiency, our platform facilitates seamless transactions, reliable product deliveries, and robust customer support.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-2">Platform Objectives</h2>
        <p className="text-gray-700 leading-relaxed">
          Our primary goal is to provide a user-friendly interface where sellers can showcase their products effectively and buyers can browse and purchase with confidence. We prioritize security, reliability, and ease of use, ensuring a smooth experience for all users.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-2">Key Features</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>Product Management:</strong> Efficient tools for sellers to manage listings, inventory, and pricing.</li>
          <li><strong>Secure Transactions:</strong> Integration with trusted payment gateways for safe and reliable payments.</li>
          <li><strong>Real-time Tracking:</strong> Seamless integration with shipping providers for transparent order tracking.</li>
          <li><strong>Customer Support:</strong> Responsive feedback systems and support channels for user inquiries and assistance.</li>
          <li><strong>Data Analytics:</strong> Insights into sales trends and customer behavior to optimize business strategies.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-2">Assumptions and Dependencies</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>User Access:</strong> Assumption that users have modern web browsers and stable internet connections.</li>
          <li><strong>Seller Responsibilities:</strong> Sellers are expected to provide accurate product information and fulfill orders promptly.</li>
          <li><strong>External Integrations:</strong> Dependence on third-party APIs for payment processing, shipping tracking, and other essential functionalities.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
