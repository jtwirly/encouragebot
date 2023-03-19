/* eslint-disable react/no-unknown-property */

import Head from 'next/head'
import { useState } from 'react';

const Home = () => {

  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await fetch(`/api/advice?prompt=${input}`);
    const data = await res.json();
    setAnswer(data.text);
    setLoading(false);
  }

  return (
    <div className='flex justify-center'>
      <Head>
        <title>Dear AIbby</title>
        <meta name="description" content="App that gives advice using OpenAI GPT-3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://dearaibby.herokuapp.com/">Dear AIbby!</a>
        </h1>

        <p className="description">
          Get some friendly advice from our AI-powered advice columnist.
        </p>
      </main>

      <div className='flex pt-40 p-4 flex-col max-w-lg w-full h-screen gap-6'>
        <h1 className='text-2xl'>Dear AIbby, give me some advice on...</h1>

        <form onSubmit={handleSubmit} className='flex justify-center flex-col gap-5'>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='border-2 border-violet-800 py-3 px-5 rounded-xl text-2xl'
          />
          <input
            className="self-end bg-violet-800 text-white py-2 px-5 rounded-md hover:bg-violet-700"
            type="submit"
            value="Submit"
          />
        </form>
        {loading && <div>Loading...</div>}
        {answer && (
          <>
            <h2>Answer:</h2>
            <div>{answer}</div>
            <footer>
              <p className="text-center">
                &copy; 2023 Dear AIbby. All rights reserved.
              </p>
            </footer>
          </>
        )}
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          text-align: center;
        }

        .text-center {
          text-align: center;
        }
      `}</style>
  </div>

);
};

export default Home;
           
