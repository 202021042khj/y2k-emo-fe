import ErrorDialog from "@/components/common/love/ErrorDialog";
import CamcorderOverlaySection from "@/components/pages/main/sections/CamcorderOverlaySection";
import ChapterSection from "@/components/pages/main/sections/ChapterSection";
import ColdOpenSection from "@/components/pages/main/sections/ColdOpenSection";
import CreditsSection from "@/components/pages/main/sections/CreditsSection";
import OrbitSection from "@/components/pages/main/sections/OrbitSection";
import { CD, EMO, HEART, PHONE, Y2K, sceneId } from "@/constants/love";

export default function DesktopPage() {
  return (
    <div className="flex flex-1 flex-col bg-love-void text-love-paper">
      <CamcorderOverlaySection device="desktop" />
      <main>
        <ColdOpenSection device="desktop" />
        <OrbitSection device="desktop" object={PHONE} />
        <ChapterSection device="desktop" chapter={Y2K} />
        <OrbitSection device="desktop" object={CD} />
        <ChapterSection device="desktop" chapter={EMO} />
        <OrbitSection device="desktop" object={HEART}>
          <ErrorDialog
            title="heart.exe"
            message={"heart.exe is not responding.\nIf you wait, it might recover."}
            waitHref={`#${sceneId("desktop", "heart")}`}
            endHref={`#${sceneId("desktop", "credits")}`}
            className="absolute top-24 right-10 w-100"
          />
        </OrbitSection>
        <CreditsSection device="desktop" />
      </main>
    </div>
  );
}
