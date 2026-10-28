import ErrorDialog from "@/components/common/love/ErrorDialog";
import CamcorderOverlay from "@/components/common/love/CamcorderOverlay";
import OrbitScene from "@/components/common/love/OrbitScene";
import ChapterSection from "@/components/pages/main/sections/ChapterSection";
import ColdOpenSection from "@/components/pages/main/sections/ColdOpenSection";
import CreditsSection from "@/components/pages/main/sections/CreditsSection";
import { CD, EMO, HEART, PHONE, SCENE_ORDER, TOTAL_FRAMES, Y2K, sceneId } from "@/constants/love";

export default function DesktopPage() {
  return (
    <div className="flex flex-1 flex-col bg-love-void text-love-paper">
      <CamcorderOverlay device="desktop" scenes={SCENE_ORDER.length} totalFrames={TOTAL_FRAMES} label="love.exe" />
      <main>
        <ColdOpenSection device="desktop" />
        <OrbitScene device="desktop" object={PHONE} detailHref="/objects/phone" detailLabel="open phone.exe" />
        <ChapterSection device="desktop" chapter={Y2K} />
        <OrbitScene device="desktop" object={CD} detailHref="/objects/cd" detailLabel="open cd.exe" />
        <ChapterSection device="desktop" chapter={EMO} />
        <OrbitScene device="desktop" object={HEART} detailHref="/objects/heart" detailLabel="open heart.exe">
          <ErrorDialog
            title="heart.exe"
            message={"heart.exe is not responding.\nIf you wait, it might recover."}
            waitHref={`#${sceneId("desktop", "heart")}`}
            endHref={`#${sceneId("desktop", "credits")}`}
            className="absolute top-24 right-10 w-100"
          />
        </OrbitScene>
        <CreditsSection device="desktop" />
      </main>
    </div>
  );
}
