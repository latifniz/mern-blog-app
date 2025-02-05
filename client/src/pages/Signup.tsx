import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// React Icons...
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import OAuth from "../components/OAuth";
import { Axios } from "../config/api";
import { handleAxiosError } from "../utils/utils";
import ShowAlert from "../components/showAlert";

type SignUpFormData = {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SignUpFormData>();

  //Form Submit.....*;
  const handleFormSubmit = async (formData: SignUpFormData) => {
    setIsLoading(true);
    try {
      setError(null);
      await Axios.post(`/auth/register`, formData);
      setIsLoading(false);
      navigate("/sign-in");
    } catch (error) {
      const err = await handleAxiosError(error);
      setError(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="my-10">
      <div className="flex flex-row items-center justify-center max-w-5xl gap-5 p-3 mx-auto rounded-md">
        {/* Left */}
        <div className="flex-1 hidden md:block">
          <div className="relative flex flex-col  max-h-[600px] md:max-w-[380px] lg:max-w-[400px] items-center overflow-hidden rounded-md cursor-pointer group border">
            <img
              src={"/image.jpg"}
              className="group-hover:scale-[1.05] transition-all duration-300 ease-in-out h-[700px] w-full"
            />
            <div className="absolute hidden w-full h-full transition-all duration-300 ease-in-out bg-black opacity-50 group-hover:block"></div>
            <Link
              to={"/"}
              className="absolute flex justify-center mb-10 text-4xl font-bold transition-all duration-300 ease-in-out group-hover:bottom-0 -bottom-28 sm:text-xl dark:text-white"
            >
              <img src="/" className="w-[200px]" alt="" />
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1">
          <div className="block md:hidden">
            <Link
              to={"/"}
              className="flex justify-center mb-10 text-4xl font-bold sm:text-xl dark:text-white"
            >
              <img
                src="../../public/through-my-eyes-logo.jpeg.png"
                className="w-[200px]"
                alt=""
              />
            </Link>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div>
              <Label value="Your fullName" htmlFor="fullname" />
              <TextInput
                type="text"
                placeholder="Your name"
                id="fullname"
                autoComplete="off"
                {...register("fullName", {
                  required: "fullname is required",
                })}
              />
              <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-500">
                {errors.fullName?.message}
              </p>
            </div>
            <div>
              <Label value="Your userName" htmlFor="username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                autoComplete="off"
                {...register("userName", {
                  required: "username is required",
                })}
              />
              <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-500">
                {errors.userName?.message}
              </p>
            </div>
            <div>
              <Label value="Your email" htmlFor="email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                autoComplete="off"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                    message: "Invalid Email Id",
                  },
                  validate: {
                    blockDomain: (value) => {
                      return (
                        !value.endsWith("test.com") ||
                        "This is not a valid domain"
                      );
                    },
                    lengthError: (value) => {
                      return (
                        value.length > 6 || "please enter a valid email address"
                      );
                    },
                  },
                })}
              />
              <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-500">
                {errors.email?.message}
              </p>
            </div>
            <div className="relative">
              <Label value="Your password" htmlFor="password" />
              <TextInput
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                id="password"
                autoComplete="off"
                {...register("password", {
                  required: "password is required",
                  validate: {
                    lengthError: (value) => {
                      return (
                        value.length >= 8 ||
                        "password must be atleast 8 characters"
                      );
                    },
                  },
                })}
              />
              <span
                className="absolute p-1.5 transition-all duration-200 ease-in-out rounded-full cursor-pointer right-2 top-8 hover:bg-blue-900 hover:text-white"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {isPasswordVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </span>
              <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-500">
                {errors.password?.message}
              </p>
            </div>
            <div>
              <Label value="Confirm your password" htmlFor="confirmPassword" />
              <TextInput
                type="password"
                placeholder="confirmPassword"
                id="confirmPassword"
                autoComplete="off"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Please confirm the password",
                  },
                  validate: (value) => {
                    return (
                      watch("password") === value ||
                      "your password does not match"
                    );
                  },
                })}
              />
              <p className="h-2 px-3 pt-1 pb-3 text-sm text-red-500">
                {errors.confirmPassword?.message}
              </p>
            </div>
            <Button
              gradientDuoTone={"purpleToPink"}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size={"sm"} />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-1 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to={"/sign-in"} className="text-blue-600 underline">
              Sign In
            </Link>
          </div>
          {error && (
            <ShowAlert
              message={error}
              type={"failure"}
              className={"mt-5 text-center"}
              onClose={() => setError(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
