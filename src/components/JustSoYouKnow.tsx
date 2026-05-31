"use client";

import React, { useEffect, useState } from "react";

type Quote = {
  quote: string;
  author: string;
};

export default function JustSoYouKnow() {
  const [quoteData, setQuoteData] = useState<Quote | null>(null);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch(
          "https://opensheet.elk.sh/1IpDZ_V73Z5VkM30GcLWsCxHI4HRp-2eEP9q2NlYK_Uo/Quotes"
        );

        const data: Quote[] = await response.json();

        const randomQuote =
          data[Math.floor(Math.random() * data.length)];

        setQuoteData(randomQuote);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
      }
    }

    fetchQuote();
  }, []);

  return (
    <section className="bg-[#1a1f2e] px-6 md:px-12 py-20">
      
      <div className="bg-white rounded-[2rem] shadow-2xl px-8 md:px-16 py-20 text-center">

        {/* LABEL */}
        <div className="inline-block bg-black text-white text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-10">
          Quote of the Day
        </div>

        {/* QUOTE */}
        <blockquote className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight max-w-4xl mx-auto">

          {quoteData
            ? `“${quoteData.quote}”`
            : "Loading quote..."}

        </blockquote>

        {/* AUTHOR */}
        <p className="mt-8 text-gray-500 text-lg">

          {quoteData
            ? `— ${quoteData.author}`
            : ""}

        </p>

      </div>

    </section>
  );
}