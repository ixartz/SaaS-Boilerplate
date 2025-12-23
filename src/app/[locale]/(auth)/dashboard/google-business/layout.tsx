import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, BarChart3, Star, FileText, Home } from "lucide-react";

export default function GoogleBusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const t = useTranslations('GoogleMeuNegocio');

  const navigation = [
    { name: t('overview'), href: "/dashboard/google-business", icon: Home },
    { name: t('insights'), href: "/dashboard/google-business/insights", icon: BarChart3 },
    { name: t('locations'), href: "/dashboard/google-business/locations", icon: MapPin },
    { name: t('reviews'), href: "/dashboard/google-business/reviews", icon: Star },
    { name: t('posts'), href: "/dashboard/google-business/posts", icon: FileText },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-muted/30 border-r border-border">
        <div className="p-4">
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Google Meu Negócio
              </CardTitle>
            </CardHeader>
          </Card>
          
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
