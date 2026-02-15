// import { Status } from "../types/api/transaction";
import { TransactionsStatus } from "@/lib/features/transactions/transaction.types";
import {
  ItemTableTransaction,
  AdminTableTransaction,
} from "../types/api/table";

export const mockAdminTableTransactions: AdminTableTransaction[] = [
  {
    user: {
      userName: "kritsada.b",
      phone: "081-234-5678",
      profileUrl: "https://i.pravatar.cc/150?img=1",
    },
    adminTransactions: [
      {
        itemName: "Laptop Dell Latitude 5440",
        assetID: "ASSET-001",
        startedAt: "2025-01-10T08:30:00Z",
        endedAt: "2025-01-10T17:30:00Z",
        message: "ขอยืมใช้งานสำหรับประชุมทีม",
        status: TransactionsStatus.APPROVE,
      },
      {
        itemName: "iPad Pro 11”",
        assetID: "ASSET-002",
        startedAt: "2025-01-12T09:00:00Z",
        endedAt: "2025-01-12T18:00:00Z",
        message: "ใช้สำหรับพรีเซนต์งานลูกค้า",
        status: TransactionsStatus.Finished,
      },
    ],
  },
  {
    user: {
      userName: "anan.c",
      phone: "089-555-1122",
      profileUrl: "https://i.pravatar.cc/150?img=2",
    },
    adminTransactions: [
      {
        itemName: "Projector Epson X500",
        assetID: "ASSET-003",
        startedAt: "2025-01-15T13:00:00Z",
        endedAt: "2025-01-15T16:00:00Z",
        message: "ใช้งานอบรมภายใน",
        status: TransactionsStatus.RESERVE,
      },
      {
        itemName: "Meeting Room A",
        assetID: "ROOM-A",
        startedAt: "2025-01-18T10:00:00Z",
        endedAt: "2025-01-18T12:00:00Z",
        message: "ยกเลิกเนื่องจากเลื่อนประชุม",
        status: TransactionsStatus.Cancel,
      },
    ],
  },
  {
    user: {
      userName: "somsak.r",
      phone: "086-888-9999",
      profileUrl: "https://i.pravatar.cc/150?img=3",
    },
    adminTransactions: [
      {
        itemName: "MacBook Pro M2",
        assetID: "ASSET-004",
        startedAt: "2025-01-20T09:00:00Z",
        endedAt: "2025-01-20T17:00:00Z",
        message: "ขอยืมทดสอบระบบ",
        status: TransactionsStatus.REJECT,
      },
      {
        itemName: "Camera Sony A7 III",
        assetID: "ASSET-005",
        startedAt: "2025-01-22T08:00:00Z",
        endedAt: "2025-01-22T18:00:00Z",
        message: "",
        status: TransactionsStatus.Blank,
      },
    ],
  },
];

// change field ให้ตรงกับresponse ของเตอร์
export const mockData: ItemTableTransaction[] = [
  {
    assetID: "ASSET-001",
    transactions: [
      {
        startedAt: "2025-01-10T09:00:00",
        endedAt: "2025-01-10T10:00:00",
        message: "ประชุมเช้า",
        status: TransactionsStatus.Finished,
        user: {
          phone: "0812345678",
          profileUrl: "https://randomuser.me/api/portraits/men/1.jpg",
          userName: "User A1",
        },
      },
      {
        startedAt: "2025-01-10T10:00:00",
        endedAt: "2025-01-10T12:00:00",
        message: "ใช้งานต่อเนื่อง",
        status: TransactionsStatus.Finished,
        user: {
          phone: "0812345679",
          profileUrl: "https://randomuser.me/api/portraits/men/2.jpg",
          userName: "User A2",
        },
      },
      {
        startedAt: "2025-01-10T13:00:00",
        endedAt: "2025-01-10T14:30:00",
        message: "ช่วงบ่าย",
        status: TransactionsStatus.RESERVE,
        user: {
          phone: "0812345680",
          profileUrl: "https://randomuser.me/api/portraits/men/3.jpg",
          userName: "User A3",
        },
      },
      {
        startedAt: "2025-01-10T14:30:00",
        endedAt: "2025-01-10T16:00:00",
        message: "ต่อเนื่องจนเย็น",
        status: TransactionsStatus.Blank,
        user: {
          phone: "0812345681",
          profileUrl: "https://randomuser.me/api/portraits/men/4.jpg",
          userName: "User A4",
        },
      },
    ],
  },

  {
    assetID: "ASSET-002",
    transactions: [
      {
        startedAt: "2025-01-10T09:00:00",
        endedAt: "2025-01-10T11:00:00",
        message: "พรีเซนต์",
        status: TransactionsStatus.Finished,
        user: {
          phone: "0820000001",
          profileUrl: "https://randomuser.me/api/portraits/women/5.jpg",
          userName: "User B1",
        },
      },
      {
        startedAt: "2025-01-10T13:00:00",
        endedAt: "2025-01-10T15:00:00",
        message: "อบรม",
        status: TransactionsStatus.Finished,
        user: {
          phone: "0820000002",
          profileUrl: "https://randomuser.me/api/portraits/women/6.jpg",
          userName: "User B2",
        },
      },
    ],
  },

  {
    assetID: "ASSET-003",
    transactions: [
      {
        startedAt: "2025-01-10T10:30:00",
        endedAt: "2025-01-10T12:00:00",
        message: "เริ่มช้า",
        status: TransactionsStatus.REJECT,
        user: {
          phone: "0830000001",
          profileUrl: "https://randomuser.me/api/portraits/men/7.jpg",
          userName: "User C1",
        },
      },
      {
        startedAt: "2025-01-10T14:00:00",
        endedAt: "2025-01-10T16:00:00",
        message: "ท้ายวัน",
        status: TransactionsStatus.Finished,
        user: {
          phone: "0830000002",
          profileUrl: "https://randomuser.me/api/portraits/men/8.jpg",
          userName: "User C2",
        },
      },
    ],
  },

  {
    assetID: "ASSET-004",
    transactions: [
      {
        startedAt: "2025-01-10T09:00:00",
        endedAt: "2025-01-10T14:00:00",
        message: "จองยาว",
        status: TransactionsStatus.APPROVE,
        user: {
          phone: "0840000001",
          profileUrl: "https://randomuser.me/api/portraits/men/9.jpg",
          userName: "User D1",
        },
      },
    ],
  },

  {
    assetID: "ASSET-005",
    transactions: [
      {
        startedAt: "2025-01-10T09:00:00",
        endedAt: "2025-01-10T09:30:00",
        message: "สั้นมาก",
        status: TransactionsStatus.Finished,
        user: {
          phone: "0850000001",
          profileUrl: "https://randomuser.me/api/portraits/women/10.jpg",
          userName: "User E1",
        },
      },
      {
        startedAt: "2025-01-10T10:00:00",
        endedAt: "2025-01-10T10:30:00",
        message: "สั้น + เว้นช่วง",
        status: TransactionsStatus.RESERVE,
        user: {
          phone: "0850000002",
          profileUrl: "https://randomuser.me/api/portraits/women/11.jpg",
          userName: "User E2",
        },
      },
      {
        startedAt: "2025-01-10T15:00:00",
        endedAt: "2025-01-10T16:00:00",
        message: "ท้ายวัน",
        status: TransactionsStatus.Finished,
        user: {
          phone: "0850000003",
          profileUrl: "https://randomuser.me/api/portraits/women/12.jpg",
          userName: "User E3",
        },
      },
    ],
  },

  {
    assetID: "ASSET-006",
    transactions: [
      {
        startedAt: "2025-01-10T15:00:00",
        endedAt: "2025-01-10T16:00:00",
        message: "เต็มวัน",
        status: TransactionsStatus.APPROVE,
        user: {
          phone: "0860000001",
          profileUrl: "https://randomuser.me/api/portraits/men/13.jpg",
          userName: "User F1",
        },
      },
    ],
  },
];
