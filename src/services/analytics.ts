import { AnalyticsData, AnalyticsDetailData } from '@/types/analytics';
import * as viewerRepository from '@/repositories/viewer';
import excelJS, { Buffer, Style } from 'exceljs';
import moment from 'moment';

export const getAnalytics = async (query: string, page: number, type: number): Promise<AnalyticsData> => {
    const result = await viewerRepository.getViewerGroupByUserId(query, page, type);

    return result;
};

export const getAnalyticsDetail = async (userId: string, query: string, page: number, type: number): Promise<AnalyticsDetailData> => {
    const result = await viewerRepository.getViewerDetailByUserId(userId, query, page, type);

    return result;
};

export const exportAnalyticsDetail = async (userId: string, type: number): Promise<Buffer> => {
    const result = await viewerRepository.getAllViewerDetailByUserId(userId, type);
    // create workbook
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('analytics');
    const defaultStyle = {
        font: { size: 16, name: 'Calibri' },
        alignment: { wrapText: true },
        border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } },
    } as Style;

    worksheet.columns = [
        { header: 'Stt', key: 'index', width: 10, style: defaultStyle },
        { header: 'Tài khoản', key: 'username', width: 35, style: defaultStyle },
        { header: 'Tên truyện', key: 'comicName', width: 35, style: defaultStyle },
        { header: 'Tên chương', key: 'chapterName', width: 60, style: defaultStyle },
        { header: 'Xem lúc', key: 'createTime', width: 30, style: defaultStyle },
    ];

    result.forEach((data, index) => {
        worksheet.addRow({ ...data, index: index + 1, createTime: moment(data.createTime).format('HH:mm:ss DD/MM/YYYY') });
    });

    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { ...defaultStyle.font, bold: true, size: 18 };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '67EB64' } };
    });

    return await workbook.xlsx.writeBuffer();
};
