import { Button, Select, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { Post } from "./PostPage";
import { handleAxiosError } from "../utils/utils";
import { Axios } from "../config/api";

type SidebarDataType = {
  searchTerm: string;
  sort: string;
  category: string;
};

const Search = () => {
  const [sidebarData, setSidebarData] = useState<SidebarDataType>({
    searchTerm: "",
    sort: "desc",
    category: "all",
  });
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        ...(searchTermFromUrl?.length && { searchTerm: searchTermFromUrl }),
        ...(sortFromUrl?.length && { sort: sortFromUrl }),
        ...(categoryFromUrl?.length && { category: categoryFromUrl }),
      });
    }

    (async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const { data } = await Axios(`/post/getposts?${searchQuery}`);
        setPosts(data.data.posts);
        setPageNo((prev) => prev + 1);
        if (data.data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setLoading(false);
      } catch (error) {
        const err = await handleAxiosError(error);
        console.log(err);
        setLoading(false);
      }
    })();
  }, [location.search]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "all";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    sidebarData.searchTerm &&
      urlParams.set("searchTerm", sidebarData.searchTerm);
    sidebarData.sort && urlParams.set("sort", sidebarData.sort);
    sidebarData.category && urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    setShowMoreLoading(true);
    setPageNo((prev) => prev + 1);
    try {
      const { data } = await Axios(`/post/getposts?page=${pageNo}`);
      setPosts([...posts, ...data.data.posts]);
      if (data.data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setShowMoreLoading(false);
    } catch (error) {
      setShowMoreLoading(false);
      return;
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="border-b border-gray-500 p-7 md:border-r md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value="all">All</option>
              <option value="uncategorized">Uncategorized</option>
              <option value="webtech">WebTech</option>
              <option value="history">History</option>
              <option value="science">Science</option>
              <option value="science-fiction">Science & Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="facts">Facts</option>
              <option value="kids">Kids</option>
              <option value="philosophy">Philosophy</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="p-3 mt-5 text-3xl font-semibold border-gray-500 sm:border-b ">
          Posts results:
        </h1>
        <div className="flex flex-wrap gap-4 p-7">
          {!loading && posts?.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && (
            <div className="grid w-full min-h-screen place-content-center">
              <Spinner size={"xl"} />
            </div>
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && !showMoreLoading && (
            <button
              className="self-center w-full text-sm text-teal-500 py-7"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
          {showMoreLoading && (
            <div className="grid w-full min-h-20 place-content-center">
              <Spinner size={"xl"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
