import CamcorderOverlay from "@/components/common/love/CamcorderOverlay";
import OrbitScene from "@/components/common/love/OrbitScene";
import PropertiesDialog from "@/components/common/love/PropertiesDialog";
import BackLinkSection from "@/components/pages/object-detail/sections/BackLinkSection";
import DetailShotSection from "@/components/pages/object-detail/sections/DetailShotSection";
import NextObjectSection from "@/components/pages/object-detail/sections/NextObjectSection";
import { DETAIL_SCENES, DETAIL_TOTAL_FRAMES } from "@/constants/love";
import type { ObjectDetailPageProps } from "@/types/love";

const id = (key: string) => `m-${key}`;

export default function MobilePage({ detail, next }: ObjectDetailPageProps) {
  const exe = `${detail.slug}.exe`;

  return (
    <div className="flex flex-1 flex-col bg-love-void text-love-paper">
      <CamcorderOverlay device="mobile" scenes={DETAIL_SCENES} totalFrames={DETAIL_TOTAL_FRAMES} />
      <BackLinkSection exe={exe} />
      <main>
        <OrbitScene
          device="mobile"
          anchor={id("orbit")}
          object={{ ...detail.object, subtitle: "scroll to turn it over.", callouts: [] }}
        >
          <PropertiesDialog
            title={`${exe} properties`}
            rows={detail.properties}
            okHref={`#${id("detail-1")}`}
            playHref={`#${id("action")}`}
            className="absolute inset-x-5 bottom-30"
          />
        </OrbitScene>
        <DetailShotSection device="mobile" id={id("detail-1")} index={1} shot={detail.details[0]} />
        <OrbitScene
          device="mobile"
          anchor={id("action")}
          object={{ ...detail.object, title: "in action", subtitle: detail.actionSubtitle, frames: detail.action, callouts: [] }}
        />
        <DetailShotSection device="mobile" id={id("detail-2")} index={2} shot={detail.details[1]} />
        <NextObjectSection device="mobile" id={id("next")} next={next} />
      </main>
    </div>
  );
}
