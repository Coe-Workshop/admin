import { ItemTableTransaction, Status } from "../types/api/item";

export const mockData: ItemTableTransaction[] = [
  {
    assetID: "ASSET-001",
    itemTransaction: [
      {
        startTime: "2025-01-10 09:00",
        endTime: "2025-01-10 12:00",
        message: "ขอยืมเครื่องเพื่อใช้ในการประชุม",
        status: Status.Approve,
        user: {
          tel: "0812345678",
          profileUrl: "https://randomuser.me/api/portraits/men/32.jpg",
          username: "Kritsada B.",
        },
      },
      ...Array.from({ length: 5 }).map((_, i) => ({
        startTime: `2025-02-${10 + i} 09:00`,
        endTime: `2025-02-${10 + i} 11:00`,
        message:
          "ใช้งานเสร็จสิ้นตามกำหนด ขอยืมเครื่องเพื่อใช้ในการประชุมขอยืมเครื่องเพื่อใช้ในการประชุมขอยืมเครื่องเพื่อใช้ในการประชุมขอยืมเครื่องเพื่อใช้ในการประชุมขอยืมเครื่องเพื่อใช้ในการประชุม",
        status: Status.Finished,
        user: {
          tel: "089000000" + i,
          profileUrl: `https://randomuser.me/api/portraits/men/${10 + i}.jpg`,
          username: `User A${i}`,
        },
      })),
    ],
  },

  {
    assetID: "ASSET-002",
    itemTransaction: [
      {
        startTime: "2025-01-08 10:00",
        endTime: "2025-01-08 11:30",
        message: "ทดสอบเครื่องก่อนนำเสนอ",
        status: Status.Finished,
        user: {
          tel: "0892223344",
          profileUrl: "https://randomuser.me/api/portraits/men/12.jpg",
          username: "Rattanakorn P.",
        },
      },
      ...Array.from({ length: 4 }).map((_, i) => ({
        startTime: `2025-03-${5 + i} 13:00`,
        endTime: `2025-03-${5 + i} 15:00`,
        message: "ใช้งานเสร็จสิ้นเรียบร้อย",
        status: Status.Finished,
        user: {
          tel: "087111222" + i,
          profileUrl: `https://randomuser.me/api/portraits/women/${30 + i}.jpg`,
          username: `User B${i}`,
        },
      })),
    ],
  },

  {
    assetID: "ASSET-003",
    itemTransaction: [
      {
        startTime: "2025-01-18 14:00",
        endTime: "2025-01-18 17:00",
        message: "ไม่ผ่านเกณฑ์การอนุมัติ",
        status: Status.Reject,
        user: {
          tel: "0805556666",
          profileUrl: "https://randomuser.me/api/portraits/men/50.jpg",
          username: "Pramote W.",
        },
      },
      ...Array.from({ length: 6 }).map((_, i) => ({
        startTime: `2025-04-${1 + i} 09:00`,
        endTime: `2025-04-${1 + i} 10:30`,
        message: "งานเสร็จสมบูรณ์",
        status: Status.Finished,
        user: {
          tel: "082999000" + i,
          profileUrl: `https://randomuser.me/api/portraits/women/${60 + i}.jpg`,
          username: `User C${i}`,
        },
      })),
    ],
  },

  // เพิ่ม asset เพิ่มเติม
  {
    assetID: "ASSET-004",
    itemTransaction: [
      {
        startTime: "2025-02-01 08:00",
        endTime: "2025-02-01 09:00",
        message: "รอการอนุมัติ",
        status: Status.Pending,
        user: {
          tel: "0811112222",
          profileUrl: "https://randomuser.me/api/portraits/men/21.jpg",
          username: "Thanakrit J.",
        },
      },
      ...Array.from({ length: 7 }).map((_, i) => ({
        startTime: `2025-05-${3 + i} 14:00`,
        endTime: `2025-05-${3 + i} 16:00`,
        message: "ดำเนินการเสร็จสิ้น",
        status: Status.Finished,
        user: {
          tel: "086333444" + i,
          profileUrl: `https://randomuser.me/api/portraits/men/${70 + i}.jpg`,
          username: `User D${i}`,
        },
      })),
    ],
  },

  {
    assetID: "ASSET-005",
    itemTransaction: [
      {
        startTime: "2025-12-12 10:00",
        endTime: "2025-12-12 12:00",
        message: "ยกเลิกการจอง",
        status: Status.Pending,
        user: {
          tel: "0825558181",
          profileUrl: "https://randomuser.me/api/portraits/women/8.jpg",
          username: "Jirawan M.",
        },
      },
      ...Array.from({ length: 8 }).map((_, i) => ({
        startTime: `2025-06-${10 + i} 09:00`,
        endTime: `2025-06-${10 + i} 11:00`,
        message: "ปิดงานเรียบร้อย",
        status: Status.Finished,
        user: {
          tel: "084888777" + i,
          profileUrl: `https://randomuser.me/api/portraits/men/${80 + i}.jpg`,
          username: `User E${i}`,
        },
      })),
    ],
  },
];
