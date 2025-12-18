import { Status } from "../types/api/transaction";
import {
  ItemTableTransaction,
  AdminTableTransaction,
} from "../types/api/table";

export const mockAdminTableTransactions: AdminTableTransaction[] = [
  {
    user: {
      username: "kritsada.b",
      tel: "081-234-5678",
      profileUrl: "https://i.pravatar.cc/150?img=1",
    },
    adminTransactions: [
      {
        itemName: "Laptop Dell Latitude 5440",
        assetId: "ASSET-001",
        startTime: "2025-01-10T08:30:00Z",
        endTime: "2025-01-10T17:30:00Z",
        message: "ขอยืมใช้งานสำหรับประชุมทีม",
        status: Status.Approved,
      },
      {
        itemName: "iPad Pro 11”",
        assetId: "ASSET-002",
        startTime: "2025-01-12T09:00:00Z",
        endTime: "2025-01-12T18:00:00Z",
        message: "ใช้สำหรับพรีเซนต์งานลูกค้า",
        status: Status.Finished,
      },
    ],
  },
  {
    user: {
      username: "anan.c",
      tel: "089-555-1122",
      profileUrl: "https://i.pravatar.cc/150?img=2",
    },
    adminTransactions: [
      {
        itemName: "Projector Epson X500",
        assetId: "ASSET-003",
        startTime: "2025-01-15T13:00:00Z",
        endTime: "2025-01-15T16:00:00Z",
        message: "ใช้งานอบรมภายใน",
        status: Status.Pending,
      },
      {
        itemName: "Meeting Room A",
        assetId: "ROOM-A",
        startTime: "2025-01-18T10:00:00Z",
        endTime: "2025-01-18T12:00:00Z",
        message: "ยกเลิกเนื่องจากเลื่อนประชุม",
        status: Status.Cancel,
      },
    ],
  },
  {
    user: {
      username: "somsak.r",
      tel: "086-888-9999",
      profileUrl: "https://i.pravatar.cc/150?img=3",
    },
    adminTransactions: [
      {
        itemName: "MacBook Pro M2",
        assetId: "ASSET-004",
        startTime: "2025-01-20T09:00:00Z",
        endTime: "2025-01-20T17:00:00Z",
        message: "ขอยืมทดสอบระบบ",
        status: Status.Rejected,
      },
      {
        itemName: "Camera Sony A7 III",
        assetId: "ASSET-005",
        startTime: "2025-01-22T08:00:00Z",
        endTime: "2025-01-22T18:00:00Z",
        message: "",
        status: Status.Blank,
      },
    ],
  },
];
export const mockData: ItemTableTransaction[] = [
  {
    assetId: "ASSET-001",
    itemTransaction: [
      {
        startTime: "2025-01-10T09:00:00",
        endTime: "2025-01-10T10:00:00",
        message: "ประชุมเช้า",
        status: Status.Finished,
        user: {
          tel: "0812345678",
          profileUrl: "https://randomuser.me/api/portraits/men/1.jpg",
          username: "User A1",
        },
      },
      {
        startTime: "2025-01-10T10:00:00",
        endTime: "2025-01-10T12:00:00",
        message: "ใช้งานต่อเนื่อง",
        status: Status.Finished,
        user: {
          tel: "0812345679",
          profileUrl: "https://randomuser.me/api/portraits/men/2.jpg",
          username: "User A2",
        },
      },
      {
        startTime: "2025-01-10T13:00:00",
        endTime: "2025-01-10T14:30:00",
        message: "ช่วงบ่าย",
        status: Status.Pending,
        user: {
          tel: "0812345680",
          profileUrl: "https://randomuser.me/api/portraits/men/3.jpg",
          username: "User A3",
        },
      },
      {
        startTime: "2025-01-10T14:30:00",
        endTime: "2025-01-10T16:00:00",
        message: "ต่อเนื่องจนเย็น",
        status: Status.Blank,
        user: {
          tel: "0812345681",
          profileUrl: "https://randomuser.me/api/portraits/men/4.jpg",
          username: "User A4",
        },
      },
    ],
  },

  {
    assetId: "ASSET-002",
    itemTransaction: [
      {
        startTime: "2025-01-10T09:00:00",
        endTime: "2025-01-10T11:00:00",
        message: "พรีเซนต์",
        status: Status.Finished,
        user: {
          tel: "0820000001",
          profileUrl: "https://randomuser.me/api/portraits/women/5.jpg",
          username: "User B1",
        },
      },
      {
        startTime: "2025-01-10T13:00:00",
        endTime: "2025-01-10T15:00:00",
        message: "อบรม",
        status: Status.Finished,
        user: {
          tel: "0820000002",
          profileUrl: "https://randomuser.me/api/portraits/women/6.jpg",
          username: "User B2",
        },
      },
    ],
  },

  {
    assetId: "ASSET-003",
    itemTransaction: [
      {
        startTime: "2025-01-10T10:30:00",
        endTime: "2025-01-10T12:00:00",
        message: "เริ่มช้า",
        status: Status.Rejected,
        user: {
          tel: "0830000001",
          profileUrl: "https://randomuser.me/api/portraits/men/7.jpg",
          username: "User C1",
        },
      },
      {
        startTime: "2025-01-10T14:00:00",
        endTime: "2025-01-10T16:00:00",
        message: "ท้ายวัน",
        status: Status.Finished,
        user: {
          tel: "0830000002",
          profileUrl: "https://randomuser.me/api/portraits/men/8.jpg",
          username: "User C2",
        },
      },
    ],
  },

  {
    assetId: "ASSET-004",
    itemTransaction: [
      {
        startTime: "2025-01-10T09:00:00",
        endTime: "2025-01-10T14:00:00",
        message: "จองยาว",
        status: Status.Approved,
        user: {
          tel: "0840000001",
          profileUrl: "https://randomuser.me/api/portraits/men/9.jpg",
          username: "User D1",
        },
      },
    ],
  },

  {
    assetId: "ASSET-005",
    itemTransaction: [
      {
        startTime: "2025-01-10T09:00:00",
        endTime: "2025-01-10T09:30:00",
        message: "สั้นมาก",
        status: Status.Finished,
        user: {
          tel: "0850000001",
          profileUrl: "https://randomuser.me/api/portraits/women/10.jpg",
          username: "User E1",
        },
      },
      {
        startTime: "2025-01-10T10:00:00",
        endTime: "2025-01-10T10:30:00",
        message: "สั้น + เว้นช่วง",
        status: Status.Pending,
        user: {
          tel: "0850000002",
          profileUrl: "https://randomuser.me/api/portraits/women/11.jpg",
          username: "User E2",
        },
      },
      {
        startTime: "2025-01-10T15:00:00",
        endTime: "2025-01-10T16:00:00",
        message: "ท้ายวัน",
        status: Status.Finished,
        user: {
          tel: "0850000003",
          profileUrl: "https://randomuser.me/api/portraits/women/12.jpg",
          username: "User E3",
        },
      },
    ],
  },

  {
    assetId: "ASSET-006",
    itemTransaction: [
      {
        startTime: "2025-01-10T15:00:00",
        endTime: "2025-01-10T16:00:00",
        message: "เต็มวัน",
        status: Status.Approved,
        user: {
          tel: "0860000001",
          profileUrl: "https://randomuser.me/api/portraits/men/13.jpg",
          username: "User F1",
        },
      },
    ],
  },
];
