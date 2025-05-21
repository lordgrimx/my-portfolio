"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();
  
  // Oturum durumunu kontrol et ve login sayfasına yönlendir
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);
  
  // Eğer oturum yükleniyorsa yükleme ekranı gösterelim
  if (status === "loading") {
    return (
      <div className="container mx-auto p-6">
        <AdminLoadingState />
      </div>
    );
  }
  
  // Eğer kimlik doğrulaması yapılmamışsa, erişim reddedildi kartını göster
  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Erişim Reddedildi</CardTitle>
            <CardDescription className="text-center">
              Bu sayfaya erişmek için giriş yapmanız gerekiyor.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.location.href = "/admin/login"}>Giriş Yap</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "Admin"} />
            <AvatarFallback>{session?.user?.name?.charAt(0) || "A"}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Admin Paneli</h1>
            <p className="text-muted-foreground">{session?.user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Yardım</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Admin Paneli Yardım</SheetTitle>
                <SheetDescription>
                  Bu panel içerik yönetimi için tasarlanmıştır. Herhangi bir sorunuz olursa teknik destek ekibiyle iletişime geçiniz.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <h3 className="font-medium">Nasıl Kullanılır?</h3>
                <p>Sekmeler arasında geçiş yaparak içeriklerinizi yönetebilirsiniz.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Dashboard: Genel istatistikler</li>
                  <li>Projeler: Portföy projelerini yönetme</li>
                  <li>Hakkımda: Kişisel bilgilerinizi güncelleme</li>
                </ul>
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="destructive" onClick={() => signOut({ callbackUrl: "/" })}>Çıkış</Button>
        </div>
      </header>

      <Tabs defaultValue="dashboard" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="projects">Projeler</TabsTrigger>
          <TabsTrigger value="about">Hakkımda</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          <DashboardTab />
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-4">
          <ProjectsTab />
        </TabsContent>
        
        <TabsContent value="about" className="space-y-4">
          <AboutTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Yükleme durumu için iskelet bileşen
function AdminLoadingState() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
      
      <Skeleton className="h-12 w-full" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
      
      <Skeleton className="h-60 w-full" />
    </div>
  );
}

// Dashboard sekmesi içeriği
function DashboardTab() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Toplam Proje</CardTitle>
            <CardDescription>Portföyünüzdeki projelerin sayısı</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Ziyaretçi Sayısı</CardTitle>
            <CardDescription>Son 30 gündeki ziyaretçi sayısı</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">742</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Son Güncelleme</CardTitle>
            <CardDescription>En son yapılan güncelleme zamanı</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">21 Mayıs 2025</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Son Aktiviteler</CardTitle>
          <CardDescription>Sistemde yapılan son değişiklikler</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Son 5 aktivite gösteriliyor</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Tarih</TableHead>
                <TableHead>İşlem</TableHead>
                <TableHead>Kullanıcı</TableHead>
                <TableHead>Detay</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>21 Mayıs 2025</TableCell>
                <TableCell>Yeni Proje Eklendi</TableCell>
                <TableCell>admin@example.com</TableCell>
                <TableCell>"E-Ticaret Sitesi" projesi eklendi</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>18 Mayıs 2025</TableCell>
                <TableCell>Hakkımda Güncellendi</TableCell>
                <TableCell>admin@example.com</TableCell>
                <TableCell>Beceriler ve deneyim bölümü güncellendi</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>15 Mayıs 2025</TableCell>
                <TableCell>Proje Silindi</TableCell>
                <TableCell>admin@example.com</TableCell>
                <TableCell>"Eski Portfolyo" projesi silindi</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10 Mayıs 2025</TableCell>
                <TableCell>Yeni Proje Eklendi</TableCell>
                <TableCell>admin@example.com</TableCell>
                <TableCell>"Mobil Uygulama" projesi eklendi</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>05 Mayıs 2025</TableCell>
                <TableCell>Admin Giriş</TableCell>
                <TableCell>admin@example.com</TableCell>
                <TableCell>Başarılı giriş</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

// Projeler sekmesi içeriği
function ProjectsTab() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Projeleriniz</h2>
        <Button>Yeni Proje Ekle</Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proje Adı</TableHead>
                <TableHead>Teknolojiler</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Son Güncelleme</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">E-Ticaret Sitesi</TableCell>
                <TableCell>React, Node.js, MongoDB</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Yayında</span>
                </TableCell>
                <TableCell>21 Mayıs 2025</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Düzenle</Button>
                    <Button variant="destructive" size="sm">Sil</Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mobil Uygulama</TableCell>
                <TableCell>React Native, Firebase</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">Geliştirme</span>
                </TableCell>
                <TableCell>10 Mayıs 2025</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Düzenle</Button>
                    <Button variant="destructive" size="sm">Sil</Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Blog Sistemi</TableCell>
                <TableCell>Next.js, Tailwind CSS</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">Planlama</span>
                </TableCell>
                <TableCell>01 Mayıs 2025</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Düzenle</Button>
                    <Button variant="destructive" size="sm">Sil</Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

// Hakkımda sekmesi içeriği
function AboutTab() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Hakkımda Bilgileri</h2>
        <Button>Değişiklikleri Kaydet</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Kişisel Bilgiler</CardTitle>
            <CardDescription>Portfolyonuzda görünen temel bilgileriniz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="font-medium">İsim</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md" 
                defaultValue="Alperen Yılmaz" 
              />
            </div>
            <div className="space-y-2">
              <label className="font-medium">Meslek</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md" 
                defaultValue="Full Stack Geliştirici" 
              />
            </div>
            <div className="space-y-2">
              <label className="font-medium">E-posta</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded-md" 
                defaultValue="contact@alperenyilmaz.com" 
              />
            </div>
            <div className="space-y-2">
              <label className="font-medium">Lokasyon</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md" 
                defaultValue="İstanbul, Türkiye" 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Hakkımda Metni</CardTitle>
            <CardDescription>Ana sayfada görünen tanıtım metniniz</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea 
              className="w-full h-48 p-2 border rounded-md" 
              defaultValue="Ben Alperen Yılmaz, 5 yıllık deneyime sahip bir Full Stack geliştirici olarak çalışmaktayım. Web ve mobil uygulama geliştirme konusunda uzmanlaştım. Modern teknolojileri kullanarak kullanıcı odaklı projeler üretiyorum. React, Next.js, Node.js, MongoDB gibi teknolojileri aktif olarak kullanıyorum."
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Yetenekler</CardTitle>
            <CardDescription>Portfolyonuzda gösterilecek becerileriniz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="font-medium">HTML/CSS</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="90">Uzman (90%)</option>
                  <option value="80">İleri (80%)</option>
                  <option value="70">Orta-İleri (70%)</option>
                  <option value="60">Orta (60%)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-medium">JavaScript</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="90">Uzman (90%)</option>
                  <option value="80">İleri (80%)</option>
                  <option value="70">Orta-İleri (70%)</option>
                  <option value="60">Orta (60%)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-medium">React.js</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="90">Uzman (90%)</option>
                  <option value="80">İleri (80%)</option>
                  <option value="70">Orta-İleri (70%)</option>
                  <option value="60">Orta (60%)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-medium">Next.js</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="80">İleri (80%)</option>
                  <option value="90">Uzman (90%)</option>
                  <option value="70">Orta-İleri (70%)</option>
                  <option value="60">Orta (60%)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-medium">Node.js</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="70">Orta-İleri (70%)</option>
                  <option value="90">Uzman (90%)</option>
                  <option value="80">İleri (80%)</option>
                  <option value="60">Orta (60%)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-medium">MongoDB</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="70">Orta-İleri (70%)</option>
                  <option value="90">Uzman (90%)</option>
                  <option value="80">İleri (80%)</option>
                  <option value="60">Orta (60%)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-medium">Tailwind CSS</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="80">İleri (80%)</option>
                  <option value="90">Uzman (90%)</option>
                  <option value="70">Orta-İleri (70%)</option>
                  <option value="60">Orta (60%)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-medium">Git</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="80">İleri (80%)</option>
                  <option value="90">Uzman (90%)</option>
                  <option value="70">Orta-İleri (70%)</option>
                  <option value="60">Orta (60%)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}