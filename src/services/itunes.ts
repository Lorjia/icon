export type CountryCode = 'CN' | 'US' | 'JP' | 'KR'
export type SoftwareEntity = 'software' | 'iPadSoftware' | 'macSoftware'

export interface ItunesAppItem {
  trackId: number
  trackName: string
  artworkUrl60?: string
  artworkUrl100?: string
  artworkUrl512?: string
  sellerName?: string
  description?: string
  trackViewUrl?: string
  primaryGenreName?: string
  genres?: string[]
  country: CountryCode
  entity: SoftwareEntity
}

interface ItunesSearchResponse {
  resultCount: number
  results: any[]
}

const regionLang: Record<CountryCode, string | undefined> = {
  CN: undefined,
  US: undefined,
  JP: 'ja_jp',
  KR: undefined,
}

export async function searchItunes(
  term: string,
  country: CountryCode,
  entity: SoftwareEntity = 'software',
  limit = 50
): Promise<ItunesAppItem[]> {
  const params = new URLSearchParams()
  params.set('term', term.trim())
  params.set('country', country)
  params.set('media', 'software')
  params.set('entity', entity)
  params.set('limit', String(Math.min(Math.max(limit, 1), 200)))
  const lang = regionLang[country]
  if (lang) params.set('lang', lang)

  const url = `https://itunes.apple.com/search?${params.toString()}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`search failed: ${res.status}`)
  const json: ItunesSearchResponse = await res.json()

  return (json.results || []).map((r: any) => ({
    trackId: r.trackId,
    trackName: r.trackName,
    artworkUrl60: r.artworkUrl60,
    artworkUrl100: r.artworkUrl100,
    artworkUrl512: r.artworkUrl512,
    sellerName: r.sellerName,
    description: r.description,
    trackViewUrl: r.trackViewUrl,
    primaryGenreName: r.primaryGenreName,
    genres: Array.isArray(r.genres) ? r.genres : undefined,
    country,
    entity,
  }))
}
