import { SubCategoryDefinitionList } from './sub_category_definition_list';

export interface SubZoneDefinition {
    id: number;
    name: string;
    subcategorynumber: string;
    hassubcategory: string;
    zoneid: number;
    subCategoryDefinitionList: SubCategoryDefinitionList[];
}