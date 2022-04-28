import { SubZoneDefinition } from './sub_zone_definition';

export interface ZoneDefinitionList {
    id: number;
    zonename: string;
    options: string;
    zonedefid: number;
    subZoneDefinitions: SubZoneDefinition[];
}