import ErrorDialog from "@/components/common/love/ErrorDialog";
import CamcorderOverlay from "@/components/common/love/CamcorderOverlay";
import OrbitScene from "@/components/common/love/OrbitScene";
import ChapterSection from "@/components/pages/main/sections/ChapterSection";
import ColdOpenSection from "@/components/pages/main/sections/ColdOpenSection";
import CreditsSection from "@/components/pages/main/sections/CreditsSection";
import { CD, EMO, HEART, PHONE, SCENE_ORDER, TOTAL_FRAMES, Y2K, sceneId } from "@/constants/love";

// On a phone the heart's error dialog takes the space its callouts would use
const MOBILE_HEART = { ...HEART, callouts: [] };

export default function MobilePage() {
  return (
    <div className="flex flex-1 flex-col bg-love-void text-love-paper">
      <CamcorderOverlay device="mobile" scenes={SCENE_ORDER.length} totalFrames={TOTAL_FRAMES} label="love.exe" />
      <main>
        <ColdOpenSection device="mobile" />
        <OrbitScene device="mobile" object={PHONE} detailHref="/objects/phone" detailLabel="open phone.exe" />
        <ChapterSection device="mobile" chapter={Y2K} />
        <OrbitScene device="mobile" object={CD} detailHref="/objects/cd" detailLabel="open cd.exe" />
        <ChapterSection device="mobile" chapter={EMO} />
        <OrbitScene device="mobile" object={MOBILE_HEART} detailHref="/objects/heart" detailLabel="open heart.exe">
          <ErrorDialog
            title="heart.exe"
            message={"heart.exe is not responding.\nIf you wait, it might recover."}
            waitHref={`#${sceneId("mobile", "heart")}`}
            endHref={`#${sceneId("mobile", "credits")}`}
            className="absolute inset-x-5 bottom-38"
          />
        </OrbitScene>
        <CreditsSection device="mobile" />
      </main>
    </div>
  );
}
