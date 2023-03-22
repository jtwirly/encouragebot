/* eslint-disable react/no-unknown-property */

import Head from 'next/head';
import { useState } from 'react';

const Home = () => {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(`Submitting request with input: ${input}`);
    const res = await fetch(`/api/advice?prompt=${input}`);
    const data = await res.json();
    console.log(`Received response: ${data.text}`);
    setAnswer(data.text);
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Head>
        <title>Dear Aibby</title>
        <meta name="description" content="App that gives advice using OpenAI GPT-3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full max-w-xl mx-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Dear Aibby</h1>
        <p className="text-lg text-center text-gray-700 mb-6">Get some friendly advice from our AI-powered advice columnist.</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-2 border-violet-800 py-2 px-4 rounded-lg text-lg w-full focus:outline-none focus:border-violet-700"
            placeholder="Type your question here..."
          />
        <input className="self-end bg-violet-800 text-white py-2 px-5 mt-4 rounded-md hover:bg-violet-700" type="submit" value="Submit" />
        </form>
        {loading && <div>Loading...</div>}
        {answer && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Answer:</h2>
            <div className="text-lg text-gray-700">{answer}</div>
          </div>
        )}
        <footer className="text-center text-gray-500 text-sm">
          <p>&copy; 2023 Dear Aibby. All rights reserved.</p>
          <p>
            Disclaimer for DearAibby, an AI-Powered Advice Columnist:
            <br />
            DearAibby is an AI-powered advice columnist designed to offer insights and suggestions based on information provided by users. The advice provided by DearAibby is intended to be informative and helpful, but should not be considered a substitute for professional advice.
            <br />
            DearAibby is not a licensed therapist or medical professional, and the advice provided is not intended to diagnose, treat, cure or prevent any disease, disorder or condition. The information provided by DearAibby is based on the input provided by users, and therefore, may not be applicable or appropriate for every individual.
            <br />
            It is important to remember that DearAibby is a machine learning model, and while it has been trained on a large dataset of advice, it is not capable of fully understanding the nuances of human emotion and behavior. Therefore, the advice provided should be taken with a grain of salt, and users are encouraged to seek additional professional advice when necessary.
            <br />
            By using DearAibby, you acknowledge that the advice provided is not a substitute for professional advice and you agree to release DearAibby and its creators from any liability resulting from your use of the service.
          </p>
        </footer>
    </div>
  </div>
  );
};

export default Home;
           
