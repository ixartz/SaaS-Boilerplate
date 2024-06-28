'use client';

import React, { useEffect, useState } from 'react';

function TestPage() {
  const [videos, setVideos] = useState<any>([]);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const getRandomImageUrl = () => {
    return `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}`;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          'https://api.dailymotion.com/videos?search=web+development&limit=10',
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // const data = await response.json();
        // console.log(data, 'datass');
        const data = await response.json();
        const videosWithImages = data.list.map((video: any) => ({
          ...video,
          imageUrl: getRandomImageUrl(),
        }));
        setVideos(videosWithImages);
        // setVideos((prev: any) => [...prev, ...videosWithImages]);
        // setVideos(data.list);
      } catch (errors: any) {
        console.error('Error fetching videos:', errors);
      }
    };

    fetchVideos();
  }, []);

  const tags = [
    'Design',
    'Development',
    'Productivity',
    'Entrepreneurship',
    'Technology',
  ];
  const displayTags = tags.map((element: any) => {
    return (
      <div
        key={element}
        className="flex flex-row items-center rounded-full bg-gray-300 px-2 py-1 text-xs font-medium text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          width="15px"
          height="12px"
          viewBox="0 0 32 32"
          version="1.1"
        >
          <path d="M30.531 15.47l-14.001-14c-0.136-0.136-0.323-0.22-0.53-0.22-0 0-0 0-0 0h-14c-0.414 0-0.75 0.336-0.75 0.75v0 14c0 0 0 0 0 0 0 0.207 0.084 0.395 0.22 0.53l14 14.001c0.136 0.135 0.323 0.219 0.53 0.219s0.394-0.084 0.53-0.219l14.001-14.001c0.135-0.136 0.218-0.323 0.218-0.53s-0.083-0.394-0.218-0.53l0 0zM16 28.939l-13.25-13.25v-12.939h12.939l13.25 13.25zM8 5.249c-1.519 0-2.75 1.231-2.75 2.75s1.231 2.75 2.75 2.75c1.519 0 2.75-1.231 2.75-2.75v0c-0.002-1.518-1.232-2.748-2.75-2.75h-0zM8 9.249c-0.69 0-1.25-0.56-1.25-1.25s0.56-1.25 1.25-1.25c0.69 0 1.25 0.56 1.25 1.25v0c-0.001 0.69-0.56 1.249-1.25 1.25h-0z" />
        </svg>
        <div>{element}</div>
      </div>
    );
  });

  const validateUrl = (urls: any) => {
    return (
      urls.startsWith('https://www.dailymotion.com') ||
      urls.startsWith('https://vimeo.com/')
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateUrl(url)) {
      alert(`Entered URL: ${url}`);
      setError('');
    } else {
      setError(
        'Please enter a URL starting with "https://www.dailymotion.com" or "https://vimeo.com/".',
      );
    }
  };
  // const imageUrl = 'https://picsum.photos/600/400/?random';
  console.log(videos, 'fadshflasdjk');
  return (
    <div>
      <section className="bg-black ">
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
            Discover the Best Content
          </h1>
          <div className="mx-auto px-4 text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold uppercase text-gray-400">
              Explore a curated collection of the latest and greatest
              articles,tutorials,and more.
            </span>
            <div className="mt-8 flex w-full flex-wrap items-center justify-center text-gray-500 ">
              <form
                onSubmit={handleSubmit}
                className="flex flex-row items-start gap-3"
              >
                <div>
                  <input
                    className="h-[30px] w-[500px] rounded-[5px] bg-white px-2"
                    placeholder="Search Url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  {error && (
                    <p className="mt-2 h-[12px] text-xs italic text-red-500">
                      {error}
                    </p>
                  )}
                </div>
                <button type="submit" className=" font-bold text-white">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto mt-10">
        <div className="container mx-auto my-12 px-4 md:px-12">
          <div className="mb-5 flex flex-row flex-wrap items-center gap-3">
            {displayTags}
          </div>
          <div className="-mx-1 flex flex-wrap lg:-mx-4">
            {videos?.map((element: any) => {
              return (
                <div
                  key={element?.id}
                  className="my-1  w-full  px-1 md:w-1/2 lg:my-4 lg:w-1/3 lg:px-4"
                >
                  <article className="flex h-full flex-col justify-stretch rounded-lg pb-3 shadow-lg">
                    <div>
                      <img
                        alt="Placeholder"
                        className="block h-auto w-full"
                        src={`${element?.imageUrl}`}
                      />
                    </div>

                    <header className="flex items-center justify-between p-2 leading-tight md:px-4">
                      <h1 className="text-lg">
                        <div className="font-bold text-black no-underline hover:underline">
                          {element?.title}
                        </div>
                      </h1>
                    </header>
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex flex-row items-center  gap-2 p-2">
                        <div className="flex flex-row items-center">
                          <svg
                            width="30px"
                            height="30px"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 200 200"
                          >
                            <path
                              fill="#282828"
                              d="M135.832 140.848h-70.9c-2.9 0-5.6-1.6-7.4-4.5-1.4-2.3-1.4-5.7 0-8.6l4-8.2c2.8-5.6 9.7-9.1 14.9-9.5 1.7-.1 5.1-.8 8.5-1.6 2.5-.6 3.9-1 4.7-1.3-.2-.7-.6-1.5-1.1-2.2-6-4.7-9.6-12.6-9.6-21.1 0-14 9.6-25.3 21.5-25.3s21.5 11.4 21.5 25.3c0 8.5-3.6 16.4-9.6 21.1-.5.7-.9 1.4-1.1 2.1.8.3 2.2.7 4.6 1.3 3 .7 6.6 1.3 8.4 1.5 5.3.5 12.1 3.8 14.9 9.4l3.9 7.9c1.5 3 1.5 6.8 0 9.1-1.6 2.9-4.4 4.6-7.2 4.6zm-35.4-78.2c-9.7 0-17.5 9.6-17.5 21.3 0 7.4 3.1 14.1 8.2 18.1.1.1.3.2.4.4 1.4 1.8 2.2 3.8 2.2 5.9 0 .6-.2 1.2-.7 1.6-.4.3-1.4 1.2-7.2 2.6-2.7.6-6.8 1.4-9.1 1.6-4.1.4-9.6 3.2-11.6 7.3l-3.9 8.2c-.8 1.7-.9 3.7-.2 4.8.8 1.3 2.3 2.6 4 2.6h70.9c1.7 0 3.2-1.3 4-2.6.6-1 .7-3.4-.2-5.2l-3.9-7.9c-2-4-7.5-6.8-11.6-7.2-2-.2-5.8-.8-9-1.6-5.8-1.4-6.8-2.3-7.2-2.5-.4-.4-.7-1-.7-1.6 0-2.1.8-4.1 2.2-5.9.1-.1.2-.3.4-.4 5.1-3.9 8.2-10.7 8.2-18-.2-11.9-8-21.5-17.7-21.5z"
                            />
                          </svg>
                          <p className="text-[14px] text-gray-500">
                            {element?.owner}
                          </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <img
                            alt="Placeholder"
                            className="block size-[15px] rounded-full"
                            src="/icons8-eye-48.png"
                          />
                          <p className="text-[14px] text-gray-500">
                            {element?.id}
                          </p>
                        </div>
                      </div>
                      <div className="px-4">{element?.title}</div>
                      <div className="mt-3 flex flex-wrap gap-2 px-4">
                        {videos?.map((item: any) => {
                          return (
                            <div
                              key={element?.channel}
                              className="flex flex-row items-center rounded-full bg-gray-300 px-2 py-1 text-xs font-medium text-gray-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                                width="15px"
                                height="12px"
                                viewBox="0 0 32 32"
                                version="1.1"
                              >
                                <path d="M30.531 15.47l-14.001-14c-0.136-0.136-0.323-0.22-0.53-0.22-0 0-0 0-0 0h-14c-0.414 0-0.75 0.336-0.75 0.75v0 14c0 0 0 0 0 0 0 0.207 0.084 0.395 0.22 0.53l14 14.001c0.136 0.135 0.323 0.219 0.53 0.219s0.394-0.084 0.53-0.219l14.001-14.001c0.135-0.136 0.218-0.323 0.218-0.53s-0.083-0.394-0.218-0.53l0 0zM16 28.939l-13.25-13.25v-12.939h12.939l13.25 13.25zM8 5.249c-1.519 0-2.75 1.231-2.75 2.75s1.231 2.75 2.75 2.75c1.519 0 2.75-1.231 2.75-2.75v0c-0.002-1.518-1.232-2.748-2.75-2.75h-0zM8 9.249c-0.69 0-1.25-0.56-1.25-1.25s0.56-1.25 1.25-1.25c0.69 0 1.25 0.56 1.25 1.25v0c-0.001 0.69-0.56 1.249-1.25 1.25h-0z" />
                              </svg>
                              <div>{item?.channel}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}

            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
