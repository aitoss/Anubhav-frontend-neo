import { readFile } from "node:fs/promises"
import path from "node:path"

type OgFont = {
    name: string
    data: ArrayBuffer
    weight: 400 | 600
    style: "normal"
}

async function localFont(file: string) {
    const buffer = await readFile(path.join(process.cwd(), "public/fonts", file))
    return buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength,
    ) as ArrayBuffer
}

/**
 * Fonts for the OG image routes: Aeonik Pro for headings and Inter for
 * everything else, matching the site.
 *
 * These are TTFs because Satori (behind ImageResponse) rejects woff2 outright
 * with "Unsupported OpenType signature wOF2", and static cuts because it also
 * cannot render a variable font — the shipped Aeonik woff2 was decompressed
 * and instanced at wght 500/600 for this. Any read failure degrades to the
 * system sans rather than 500ing the image route.
 */
export async function loadOgFonts(): Promise<OgFont[]> {
    const wanted: { name: string; file: string; weight: 400 | 600 }[] = [
        { name: "Aeonik Pro", file: "aeonik-pro-600.ttf", weight: 600 },
        { name: "Aeonik Pro", file: "aeonik-pro-500.ttf", weight: 400 },
        { name: "Inter", file: "inter-400.ttf", weight: 400 },
        { name: "Inter", file: "inter-600.ttf", weight: 600 },
    ]

    const loaded = await Promise.all(
        wanted.map(async (font) => {
            try {
                return {
                    name: font.name,
                    data: await localFont(font.file),
                    weight: font.weight,
                    style: "normal" as const,
                }
            } catch {
                return null
            }
        }),
    )

    return loaded.filter((font): font is OgFont => font !== null)
}

// The full brand mark from favicon.svg (80x80 viewBox), not the bare chevron.
export const LOGO_PATH =
    "M39.5122 20.2489L28.4529 38.4277L30.1481 38.9612L17.5007 59.7498L17.5 59.7511H22.5571C26.4631 59.7511 30.0656 57.6451 31.9818 54.2414L39.616 40.67L40.2157 41.7208L47.2669 54.2414C49.183 57.6451 52.7855 59.7511 56.6915 59.7511H62.5L49.3871 38.9132L50.9525 38.4284L39.5122 20.2489Z"
