import { licenseUrl } from "@/lib/format";
import type { PhotoCredit } from "@/lib/types";

/** "Representative photo: Author · CC BY 2.0", with links to the source and license. */
export default function PhotoCreditLine({ credit }: { credit: PhotoCredit }) {
  const deed = licenseUrl(credit.license);
  return (
    <span>
      Representative photo:{" "}
      <a href={credit.source} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-brand hover:underline">
        {credit.author}
      </a>{" "}
      ·{" "}
      {deed ? (
        <a href={deed} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-brand hover:underline">
          {credit.license}
        </a>
      ) : (
        credit.license
      )}
    </span>
  );
}
