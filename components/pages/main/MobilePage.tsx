import ErrorDialog from "@/components/common/love/ErrorDialog";
import CamcorderOverlaySection from "@/components/pages/main/sections/CamcorderOverlaySection";
import ChapterSection from "@/components/pages/main/sections/ChapterSection";
import ColdOpenSection from "@/components/pages/main/sections/ColdOpenSection";
import CreditsSection from "@/components/pages/main/sections/CreditsSection";
import OrbitSection from "@/components/pages/main/sections/OrbitSection";
import { CD, EMO, HEART, PHONE, Y2K, sceneId } from "@/constants/love";

// On a phone the heart's error dialog takes the space its callouts would use
const MOBILE_HEART = { ...HEART, callouts: [] };

export default function MobilePage() {
  return (
    <div className="flex flex-1 flex-col bg-love-void text-love-paper">
      <CamcorderOverlaySection device="mobile" />
      <main>
        <ColdOpenSection device="mobile" />
        <OrbitSection device="mobile" object={PHONE} />
        <ChapterSection device="mobile" chapter={Y2K} />
        <OrbitSection device="mobile" object={CD} />
        <ChapterSection device="mobile" chapter={EMO} />
        <OrbitSection device="mobile" object={MOBILE_HEART}>
          <ErrorDialog
            title="heart.exe"
            message={"heart.exe is not responding.\nIf you wait, it might recover."}
            waitHref={`#${sceneId("mobile", "heart")}`}
            endHref={`#${sceneId("mobile", "credits")}`}
            className="absolute inset-x-5 bottom-38"
          />
        </OrbitSection>
        <CreditsSection device="mobile" />
      </main>
    </div>
  );
}
