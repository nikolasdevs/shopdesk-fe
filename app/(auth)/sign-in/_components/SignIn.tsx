"use client";
import Image from "next/image";
import boxBg from "../../../../public/signIn/box-minimalistic-svgrepo-com 1 (1).png";
import box from "../../../../public/signIn/box-minimalistic-svgrepo-com 1.png";
import mail from "../../../../public/signIn/character-1--inject-1.png";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(11, "Phone number must be at least 11 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer TypeScript types from Zod schema
type SignInFormData = z.infer<typeof SignInSchema>;

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="w-full  h-screen items-center justify-center">
      <div className="px-16 flex w-full justify-between items-center h-full">
        <div className="flex flex-col items-start w-1/2 gap-4">
          <div className="flex flex-col items-start  gap-2">
            <Image src={box} alt=" box image" />
            <h1>ShopDesk</h1>
            <p>
              Run your Business with{" "}
              <span className="text-green-600">Ease</span>{" "}
            </p>
          </div>
          <div>
            <Image src={mail} alt="email Image" />
          </div>
        </div>
        <div className=" w-[588px] h-[688px]  flex items-center justify-center flex-col px-8 gap-8 relative">
          <Image
            src={boxBg}
            alt="email Image"
            className="absolute -top-32 -right-5 w-80"
          />
          <h2 className="text-5xl font-semibold mb-4">Sign in</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 w-full flex flex-col gap-8"
          >
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full border p-4 rounded-[9px]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register("password")}
                className="w-full border p-4 rounded-[9px]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-neutral-300 text-white py-3 px-6 rounded-[12px] hover:bg-neutral-400"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
