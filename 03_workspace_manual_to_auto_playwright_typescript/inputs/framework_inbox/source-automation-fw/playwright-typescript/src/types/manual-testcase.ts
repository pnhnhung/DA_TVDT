export type ManualTestStep = {
  no: number;
  action: string;
  expected: string;
  dataRef?: string;
  locatorRef?: string;
};

/**
 * Trạng thái sẵn sàng automation của test case.
 * Dùng bởi AI workflow 01 để quyết định có sinh spec hay không.
 */
export type AutomationStatus =
  | 'AUTO_READY'           // Có thể sinh spec ngay, đủ locator + data
  | 'AUTO_WITH_CONDITION'  // Cần điều kiện bổ sung (setup, API, data)
  | 'MANUAL_ONLY'          // Không thể tự động hóa (captcha, physical action)
  | 'BLOCKED';             // Bị block bởi bug, dependency, hoặc missing locator

export type ManualTestCase = {
  id: string;
  module: string;
  title: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  type: 'positive' | 'negative' | 'boundary' | 'integration' | 'regression' | 'smoke';

  /** Trạng thái automation — AI dùng để filter trước khi gen spec */
  automationStatus: AutomationStatus;

  /** Ghi chú cho AI hoặc dev về điều kiện / blocker */
  automationNotes?: string;

  preconditions: string[];
  testDataRefs: string[];
  locatorPackageRefs: string[];
  steps: ManualTestStep[];
  expectedFinalResult: string;
  tags: string[];

  /** Metadata traceability */
  createdAt?: string;   // ISO 8601
  updatedAt?: string;   // ISO 8601
  author?: string;
};
