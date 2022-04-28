import { ZoneDefinitionList } from './zone_definition_list';


export interface BranchZones {
    id: number;
    branchid: string;
    zoneDefinitionList: ZoneDefinitionList[];
}