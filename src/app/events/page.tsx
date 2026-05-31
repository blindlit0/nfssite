"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { initFirebase, type FirebaseServices } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import EventCard from "../../components/EventCardFinal";
import Loader from "../../components/Loader";
import FEvent from "../../components/fevent";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  imageName?: string;
  time?: string;
}

const EventsPage = () => {
  const { isAdmin } = useAuth();

  const [firebase, setFirebase] =
    useState<FirebaseServices | null>(null);

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    const firebaseServices = initFirebase();
    setFirebase(firebaseServices);
  }, []);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          "https://opensheet.elk.sh/1IpDZ_V73Z5VkM30GcLWsCxHI4HRp-2eEP9q2NlYK_Uo/News"
        );

        const data = await response.json();

        const sortedNews = [...data].sort(
          (a, b) => Number(a.priority || 999) - Number(b.priority || 999)
        );

        setNews(sortedNews);

      } catch (error) {
        console.error("Failed to fetch news:", error);
      }

      setNewsLoading(false);
    }

    fetchNews();
  }, []);

  const fetchEvents = async () => {
    if (!firebase) return;

    try {
      const querySnapshot = await getDocs(
        collection(firebase.db, "events")
      );

      const eventsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];

      setEvents(eventsList);

    } catch (error) {
      console.error("Error fetching events:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (firebase) {
      fetchEvents();
    }
  }, [firebase]);

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <main className="w-full overflow-x-hidden bg-white">

      {/* HERO SECTION */}
      <section className="w-full min-h-screen bg-gradient-to-b from-[#2d3f00] to-white flex flex-col justify-center">

        <div className="w-full px-6 md:px-12 py-20 text-center">

          <div className="inline-block bg-white text-black text-xs tracking-[0.3em] uppercase px-5 py-2 rounded-full shadow mb-8">
            NFSSS Welfare
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Welfare Updates
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed">
            Stay informed about welfare activities, programs, and general events within the department.
          </p>

        </div>

      </section>

      


      {/* SMALL NEWS SECTION */}
      <section className="w-full bg-black py-24">

        <div className="px-6 md:px-12">

          <div className="text-center mb-16">


            <h2 className="text-5xl font-bold text-white">
              Just So You Know
            </h2>

            <p className="mt-5 text-gray-400 text-lg max-w-2xl mx-auto">
              Quick updates, announcements, and little things happening
              around the department community.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {newsLoading ? (

              <div className="col-span-full text-center text-gray-500">
                Loading updates...
              </div>

            ) : news.length > 0 ? (

              news.map((item, index) => (

                <article
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-sm hover:bg-white/10 transition duration-300"
                >

                  <div className="text-sm uppercase tracking-widest text-gray-400 mb-4">
                    {item.category}
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-gray-400 leading-relaxed">
                    {item.content}
                  </p>

                </article>

              ))

            ) : (

              <div className="col-span-full text-center text-gray-500">
                No updates available.
              </div>

            )}

</div>

        </div>

      </section>

      {/* FEATURED EVENTS */}
      <section className="w-full bg-white">

        <FEvent />

      </section>

    </main>
  );
};

export default EventsPage;