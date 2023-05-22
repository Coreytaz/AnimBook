export interface Geolocation {
    latitude: number
    longitude: number
}

export interface Geo {
    type: string
    features: Feature[]
}

export interface Feature {
    type: string
    geometry: Geometry
    properties: Properties
}

export interface Geometry {
    type: string
    coordinates: number[]
}

export interface Properties {
    country_code: string
    housenumber: string
    street: string
    country: string
    county: string
    datasource: Datasource
    state: string
    city: string
    lon: number
    lat: number
    distance: number
    result_type: string
    postcode: string
    suburb: string
    formatted: string
    address_line1: string
    address_line2: string
    timezone: Timezone
    rank: Rank
    place_id: string
}

export interface Datasource {
    sourcename: string
    attribution: string
    license: string
    url: string
}

export interface Rank {
    popularity: number
}

export interface Timezone {
    name: string
    offset_STD: string
    offset_STD_seconds: number
    offset_DST: string
    offset_DST_seconds: number
}

export interface GEO_Addres {
    value: string
    unrestricted_value: string
    data: Data
}

export interface Data {
    postal_code: null | string
    country: string
    country_iso_code: string
    federal_district: string
    region_fias_id: string
    region_kladr_id: string
    region_iso_code: string
    region_with_type: string
    region_type: string
    region_type_full: string
    region: string
    area_fias_id: null | string
    area_kladr_id: null | string
    area_with_type: null | string
    area_type: null | string
    area_type_full: null | string
    area: null | string
    city_fias_id: null | string
    city_kladr_id: null | string
    city_with_type: null | string
    city_type: null | string
    city_type_full: null | string
    city: null | string
    city_area: null
    city_district_fias_id: null
    city_district_kladr_id: null
    city_district_with_type: null
    city_district_type: null
    city_district_type_full: null
    city_district: null
    settlement_fias_id: null
    settlement_kladr_id: null
    settlement_with_type: null
    settlement_type: null
    settlement_type_full: null
    settlement: null
    street_fias_id: null
    street_kladr_id: null
    street_with_type: null
    street_type: null
    street_type_full: null
    street: null
    stead_fias_id: null
    stead_cadnum: null
    stead_type: null
    stead_type_full: null
    stead: null
    house_fias_id: null
    house_kladr_id: null
    house_cadnum: null
    house_type: null
    house_type_full: null
    house: null
    block_type: null
    block_type_full: null
    block: null
    entrance: null
    floor: null
    flat_fias_id: null
    flat_cadnum: null
    flat_type: null
    flat_type_full: null
    flat: null
    flat_area: null
    square_meter_price: null
    flat_price: null
    room_fias_id: null
    room_cadnum: null
    room_type: null
    room_type_full: null
    room: null
    postal_box: null
    fias_id: string
    fias_code: null
    fias_level: string
    fias_actuality_state: string
    kladr_id: string
    geoname_id: null | string
    capital_marker: string
    okato: string
    oktmo: string
    tax_office: string
    tax_office_legal: string
    timezone: null
    geo_lat: null | string
    geo_lon: null | string
    beltway_hit: null
    beltway_distance: null
    metro: null
    divisions: null
    qc_geo: string
    qc_complete: null
    qc_house: null
    history_values: string[] | null
    unparsed_parts: null
    source: null
    qc: null
}
