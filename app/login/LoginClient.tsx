"use client";
import Image from "next/image";
import box from "../../public/sign-in/box-minimalistic-svgrepo-com 1.png";
import mail from "../../public/sign-in/character-1--inject-1.png";

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

export const LoginClient = () => {
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
    <div>
      <div>
        <div>
          <Image src={box} alt=" box image" />
          <h1>ShopDesk</h1>
          <p>
            Run your Business with <span className="text-green-600">Ease</span>{" "}
          </p>
        </div>
        <div>
          <Image src={mail} alt="email Image" />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              {...register("phoneNumber")}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};
