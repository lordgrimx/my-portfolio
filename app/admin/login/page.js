"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function AdminLogin() {
  const form = useForm({
    defaultValues: {
      username: "",
      password: ""
    }
  });
  
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginError, setLoginError] = useState("");
  
  // URL'deki hata parametresini kontrol et
  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "CredentialsSignin") {
      setLoginError("E-posta veya şifre hatalı.");
    } else if (error === "OAuthSignin" || error === "OAuthCallback" || error === "OAuthAccountNotLinked") {
      setLoginError("GitHub hesabınız ile giriş yapılamadı. Bu hesap yetkili değil.");
    }
  }, [searchParams]);
  
  // Eğer kullanıcı zaten giriş yapmışsa, admin paneline yönlendir
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin");
    }
  }, [status, router]);

  // Form gönderildiğinde çalışacak fonksiyon
  function onSubmit(data) {
    signIn("credentials", {
      email: data.username, // form alanı username, API email bekliyor
      password: data.password,
      redirect: true,
      callbackUrl: "/admin"
    }).catch(error => console.error("Login failed:", error));
  }

  // Eğer oturum yükleniyorsa, bekleme mesajı göster
  if (status === "loading") {
    return (
      <div className="flex h-screen w-full bg-[#0a2030] text-white items-center justify-center">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  // Eğer kullanıcı oturum açmamışsa, giriş formunu göster
  if (status === "unauthenticated") {
    return (
      <div className="flex h-screen w-full bg-[#0a2030] text-white">
      {/* Sol Taraf - Logo ve Marka */}
      <div className="flex w-1/2 flex-col items-center justify-center border-r border-gray-700">
        <div className="flex items-center justify-center flex-start">
            <Image src="/vercel.svg" width={150} height={150} alt="loginPage"/>
        <h1 className="text-4xl font-bold">Admin Panel</h1>
        </div>
        
      </div>

      {/* Sağ Taraf - Giriş Formu */}
      <div className="flex w-1/2 flex-col items-center justify-center px-16">

        <div className="mb-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold">Giriş Yap</h1>
            <p className="mt-2 text-gray-400">Admin paneline giriş yapın</p>
            {loginError && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-600 rounded-md text-red-200 text-sm">
                {loginError}
              </div>
            )}
        </div>
        <div className="w-full max-w-sm">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                            <Input placeholder="örnek@mail.com" value={field.value || ""} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="********" value={field.value || ""} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Submit</Button>
                    <div className="border-t border-gray-600 pt-4 text-center text-sm text-gray-400">
                      Veya
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full mt-4 bg-black text-white hover:bg-gray-800 flex items-center justify-center gap-2"
                      onClick={() => signIn("github", { 
                        callbackUrl: "/admin",
                        redirect: true,
                      })}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub ile Giriş Yap
                    </Button>
                </form>
            </Form>
            
        </div>

      </div>
    </div>
  );
  }
  
  // Eğer kullanıcı zaten oturum açmışsa, bu kısmı çalıştırmaz
  // useEffect içinde yönlendirme yapar
  return null;
}