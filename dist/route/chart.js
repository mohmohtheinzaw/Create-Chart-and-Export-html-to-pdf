"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const jspdf_1 = __importDefault(require("jspdf"));
const ChartJsImage = require('chartjs-to-image');
const myChart = new ChartJsImage();
var xLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
myChart.setConfig({
    type: 'bar',
    data: {
        labels: xLabels,
        datasets: [
            {
                label: 'low',
                backgroundColor: 'blue',
                data: [12, 19, 3, 5, 2, 3, 14, 3, 6, 2, 9, 1, 33, 23, 25],
            },
            {
                label: 'High',
                backgroundColor: 'red',
                data: [6, 3, 12, 4, 8, 1, 9, 8, 5, 3, 4, 6, 8, 10, 19],
            },
        ]
    },
});
router.get("/chart", function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dataUrl = yield myChart.toDataUrl();
            console.log(dataUrl);
            return dataUrl;
        }
        catch (error) {
            console.log(error);
        }
    });
});
router.get("/export-to-pdf", function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dataUrl = yield myChart.toDataUrl();
            const pdf = new jspdf_1.default();
            pdf.addImage(dataUrl, "PNG", 10, 10, 100, 75);
            pdf.save("BarChart.pdf");
        }
        catch (error) {
            console.log(error);
        }
    });
});
module.exports = router;
