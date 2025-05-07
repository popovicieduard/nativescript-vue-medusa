import { RouteRecordSingleViewWithChildren } from 'vue-router'

export type Route = PartialKeys<Omit<RouteRecordSingleViewWithChildren, 'redirect'>, 'children'>
