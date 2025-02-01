import { Link } from "react-router-dom";
import { useAppSelector } from "../store/storeHooks";
import Posts from "../components/Posts";

const Home = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  return (
    <div>
      <div className="flex flex-col max-w-6xl gap-6 px-3 py-10 mx-auto md:py-28 ">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome {currentUser ? currentUser?.fullName : "to Through My Eyes"}
        </h1>
        <h2 className="text-lg font-semibold">
          Through My Eyes: Exploring kids' stories, philosophy, science, and the
          beauty of positivity.
        </h2>
        <p className="text-xs text-gray-500 sm:text-sm">
          "Welcome to Through My Eyes! Step into my world where stories,
          science, philosophy, and positivity come together. This blog is all
          about sparking curiosity, inspiring growth, and sharing uplifting
          ideas. Join me as we explore life with wonder and optimism, one post
          at a time!"
        </p>
        <Link
          to="/search"
          className="text-xs font-bold text-teal-500 sm:text-sm hover:underline"
        >
          View all posts
        </Link>
      </div>
      <Posts category="all" title="Recent Posts" />
      <Posts category="webtech" title="Web Tech" />
      <Posts category="history" title="History" />
      <Posts category="science" title="Science" />
      <Posts category="science-fiction" title="Science & Fiction" />
      <Posts category="mystery" title="Mystery" />
      <Posts category="facts" title="Facts" />
    </div>
  );
};

export default Home;
