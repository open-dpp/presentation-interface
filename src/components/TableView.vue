<template>
  <div class="-mx-4 mt-8 sm:-mx-0">
    <table class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            v-for="(field, index) in props.dataSection.dataFields"
            scope="col"
            :class="[generateHeaderClasses(index)]"
          >
            {{ field.name }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr
          v-for="(dataValuesOfRow, rowIndex) in dataSection.dataValues"
          :key="rowIndex"
        >
          <td
            v-for="(dataValue, id, colIndex) in dataValuesOfRow"
            :key="id"
            :class="[generateCellClasses(colIndex)]"
          >
            <DataValue
              :field-view="{
                dataField: dataSection.dataFields.find((d) => d.id === id)!,
                value: dataValue,
              }"
            />
          </td>
          <td class="py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-0">
            <a href="#" class="text-indigo-600 hover:text-indigo-900"
              >Mehr Infos</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { DataSectionDto } from "@open-dpp/api-client";
import DataValue from "./DataValue.vue";

const props = defineProps<{ dataSection: DataSectionDto }>();

const generateHeaderClasses = (index: number) => {
  return index === 0
    ? "py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
    : "hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell";
};

const generateCellClasses = (index: number) => {
  return index === 0
    ? "px-3 py-4 text-sm text-gray-500 table-cell"
    : "hidden px-3 py-4 text-sm text-gray-500 lg:table-cell";
};
</script>
