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
  
    try {
      // Check if the input is appropriate using the NLP API route
      const nlpRes = await fetch('/api/nlp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const nlpData = await nlpRes.json();
  
      if (nlpData.output === 'appropriate') {
        const res = await fetch(`/api/advice?prompt=${input}`);
        const data = await res.json();
        console.log(`Received response: ${data.text}`);
        setAnswer(data.text);
      } else {
        setAnswer('We encourage you to ask a different question.');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#d0f2f6]">
      <Head>
        <title>EncourageBot</title>
        <meta name="description" content="App that gives encouragement using OpenAI GPT-3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full max-w-[1400px] mx-4">
        {/* <h1 className="text-4xl font-bold  text-gray-800 mb-4">EncourageBot</h1> */}
        <div className='flex items-end gap-8'>
          <img src="/logo.png" alt="EncourageBot Logo" className="block h-[100px] w-full max-w-[600px]" />
          <img src="/image-7@2x.png" alt="" className="block h-[200px] w-full max-w-[200px]" />
        </div>
        <p className="text-3xl text-[#2638f5] mt-4 mb-6 font-semibold">Get some friendly encouragement from our AI-powered cheerleader.</p>
        <form onSubmit={handleSubmit} className="">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-2 py-4 px-4 text-2xl w-full focus:outline-none ring-1 ring-transparent focus:ring-violet-700 rounded-[400px]"
            placeholder="What would you like to receive encouragement about?"
          />
        <input className="self-end bg-[#ff5989] text-white py-3 px-8 mt-4 text-2xl"   type="submit" value="Submit" />
        </form>
        {loading && <div>Loading...</div>}
        {answer && (
          <div className="box-border gap-8 py-282 px-813 bg-[#2638f5] shadow-lg p-6 mt-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Encouragement:</h2>
            <div className="text-2xl text-white">{answer}</div>
          </div>
        )}
        <footer className="text-center text-gray-500 text-sm mt-10">
          <p>&copy; 2023 EncourageBot. All rights reserved.</p>
          <p>
            Disclaimer for EncourageBot, an AI-Powered Encourager: Please read this disclaimer carefully before using the EncourageBot (&quot;the App&quot;). By accessing or using the App, you agree to be bound by the terms and conditions stated herein. If you do not agree with these terms and conditions, please refrain from using the App.

Purpose and Limitations
EncourageBot is an AI-powered application designed to provide users with verbal encouragement on various topics. The App is intended for entertainment and informational purposes only and should not be relied upon as a substitute for professional advice or support. The App does not provide medical, psychological, legal, or any other professional advice or services.

No Guarantee of Accuracy or Effectiveness
While we strive to provide helpful and relevant encouragement, we cannot guarantee the accuracy, effectiveness, or suitability of the encouragement provided by the App. Users are encouraged to use their own discretion and judgment when applying any advice or suggestions provided by the App to their specific circumstances.

No Liability
The developers, creators, and operators of EncourageBot shall not be held liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from the use of, or inability to use, the App. This includes, but is not limited to, any negative consequences or dissatisfaction resulting from the encouragement provided by the App.

Intellectual Property
All content, features, and functionality within the App, including but not limited to text, graphics, logos, and code, are the property of the App&apos;s creators and are protected by copyright, trademark, and other intellectual property laws.

Changes to the Disclaimer
We reserve the right to modify this disclaimer at any time, effective upon posting of an updated version on the App. Your continued use of the App after any such changes shall constitute your consent to such changes.

Governing Law
This disclaimer shall be governed by and construed in accordance with the laws of the jurisdiction in which the App is operated.
         </p>
        </footer>
    </div>
  </div>
  );
};

export default Home;
           
