import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DesktopPage from "@/components/pages/object-detail/DesktopPage";
import MobilePage from "@/components/pages/object-detail/MobilePage";
import { OBJECT_DETAILS } from "@/constants/love";
import type { ObjectSlug } from "@/types/love";

interface ObjectDetailRouteProps {
  params: Promise<{ slug: string }>;
}

const isSlug = (slug: string): slug is ObjectSlug => slug in OBJECT_DETAILS;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(OBJECT_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ObjectDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  const { object } = OBJECT_DETAILS[slug];
  return { title: `${slug}.exe — ${object.title} · love.exe`, description: object.frames.alt };
}

export default async function ObjectDetailPage({ params }: ObjectDetailRouteProps) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();

  const detail = OBJECT_DETAILS[slug];
  const props = { detail, next: OBJECT_DETAILS[detail.next] };

  return (
    <div className="flex flex-1 flex-col">
      <div className="hidden md:flex md:flex-1">
        <DesktopPage {...props} />
      </div>
      <div className="flex flex-1 md:hidden">
        <MobilePage {...props} />
      </div>
    </div>
  );
}
