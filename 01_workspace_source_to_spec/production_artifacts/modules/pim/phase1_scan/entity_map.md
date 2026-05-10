# Entity Map: PIM

## Entities

### Entity: CustomField
- **Table**: `hs_hr_custom_fields`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | integer | PK | | |
  |  | string(250) | Not Null | | |
  |  | string(11) | Not Null | | |
  |  | string(100) |  | | |
  |  | string(250) |  | | |

### Entity: EmpContract
- **Table**: `hs_hr_emp_contract_extend`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | decimal | PK | | |
  |  | datetime |  | | |
  |  | datetime |  | | |

### Entity: EmpDependent
- **Table**: `hs_hr_emp_dependents`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | decimal | PK | | |
  |  | string(100) |  | | |
  |  | string |  | | |
  |  | string(100) |  | | |
  |  | date |  | | |

### Entity: EmpDirectDebit
- **Table**: `hs_hr_emp_directdebit`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | integer | PK | | |
  |  | integer(9) | Not Null | | |
  |  | string(100) | Not Null | | |
  |  | decimal | Not Null | | |
  |  | string(20) | Not Null | | |
  |  | string(20) | Not Null | | |

### Entity: EmpEmergencyContact
- **Table**: `hs_hr_emp_emergency_contacts`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | decimal | PK | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |

### Entity: EmpLocations
- **Table**: `hs_hr_emp_locations`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|

### Entity: Employee
- **Table**: `hs_hr_employee`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | integer(4) | PK | | |
  |  | string(50) |  | | |
  |  | string(100) | Not Null | | |
  |  | string(100) | Not Null | | |
  |  | string(100) | Not Null | | |
  |  | string(100) |  | | |
  |  | smallint |  | | |
  |  | string(13) |  | | |
  |  | date |  | | |
  |  | smallint |  | | |
  |  | string(20) |  | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |
  |  | date |  | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |
  |  | string(20) |  | | |
  |  | string(50) |  | | |
  |  | string(50) |  | | |
  |  | string(50) |  | | |
  |  | string(50) |  | | |
  |  | string(13) |  | | |
  |  | date |  | | |
  |  | string(50) |  | | |
  |  | string(250) |  | | |
  |  | string(250) |  | | |
  |  | string(250) |  | | |
  |  | string(250) |  | | |
  |  | string(250) |  | | |
  |  | string(250) |  | | |
  |  | string(250) |  | | |
  |  | string(250) |  | | |
  |  | string(250) |  | | |
  |  | string(250) |  | | |
  |  | datetime |  | | |

### Entity: EmployeeAttachment
- **Table**: `hs_hr_emp_attachment`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | integer | PK | | |
  |  | string(200) |  | | |
  |  | string(100) |  | | |
  |  | integer |  | | |
  | attachment | blob |  | | |
  |  | string(200) |  | | |
  |  | string(100) |  | | |
  |  | integer |  | | |
  |  | string(200) |  | | |
  |  | datetime | Not Null | | |

### Entity: EmployeeEducation
- **Table**: `ohrm_emp_education`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | integer | PK | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |
  |  | decimal(4) |  | | |
  |  | string(25) |  | | |
  |  | date |  | | |
  |  | date |  | | |

### Entity: EmployeeEvent
- **Table**: `ohrm_employee_event`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | integer(7) | PK | | |
  |  | integer(7) | Not Null | | |
  |  | string(45) |  | | |
  |  | string(45) |  | | |
  |  | string(150) |  | | |
  |  | datetime |  | | |
  |  | string(45) |  | | |

### Entity: EmployeeImmigrationRecord
- **Table**: `hs_hr_emp_passport`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | decimal | PK | | |
  |  | string(100) | Not Null | | |
  |  | datetime |  | | |
  |  | datetime |  | | |
  |  | string(255) |  | | |
  |  | smallint |  | | |
  |  | string(100) |  | | |
  |  | date |  | | |
  |  | string(6) |  | | |

### Entity: EmployeeLanguage
- **Table**: `hs_hr_emp_language`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | smallint | PK | | |
  |  | smallint |  | | |
  |  | string(100) |  | | |

### Entity: EmployeeLicense
- **Table**: `ohrm_emp_license`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | string(50) |  | | |
  |  | date |  | | |
  |  | date |  | | |

### Entity: EmployeeMembership
- **Table**: `hs_hr_emp_member_detail`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | integer(6) | PK | | |
  |  | decimal |  | | |
  |  | string(20) |  | | |
  |  | string(20) |  | | |
  |  | date |  | | |
  |  | date |  | | |

### Entity: EmployeeSalary
- **Table**: `hs_hr_emp_basicsalary`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | integer | PK | | |
  |  | string(100) |  | | |
  |  | string(100) |  | | |
  |  | string(255) |  | | |

### Entity: EmployeeSkill
- **Table**: `hs_hr_emp_skill`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | decimal(2) |  | | |
  |  | string(100) | Not Null | | |

### Entity: EmployeeSubscription
- **Table**: `ohrm_employee_subscription`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  | id | integer(4) | PK | | |
  | employeeId | integer(4) | Not Null | | |
  | status | integer(4) | Not Null | | |
  | createdAt | date(25) | Not Null | | |

### Entity: EmployeeTerminationRecord
- **Table**: `ohrm_emp_termination`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | integer(4) | PK | | |
  |  | date | Not Null | | |
  |  | string(255) |  | | |

### Entity: EmployeeWorkShift
- **Table**: `ohrm_employee_work_shift`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|

### Entity: EmpPicture
- **Table**: `hs_hr_emp_picture`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  | picture | blob |  | | |
  |  | string(100) |  | | |
  |  | string(50) |  | | |
  |  | string(20) |  | | |
  |  | string(20) |  | | |
  |  | string(20) |  | | |

### Entity: EmpUsTaxExemption
- **Table**: `hs_hr_emp_us_tax`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | string(13) |  | | |
  |  | integer(2) |  | | |
  |  | string(13) |  | | |
  |  | string(13) |  | | |
  |  | integer(2) |  | | |
  |  | string(13) |  | | |
  |  | string(13) |  | | |

### Entity: EmpWorkExperience
- **Table**: `hs_hr_emp_work_experience`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | decimal | PK | | |
  |  | string(100) |  | | |
  |  | string(120) |  | | |
  |  | datetime(25) |  | | |
  |  | datetime(25) |  | | |
  |  | string(200) |  | | |
  |  | integer(4) | Not Null | | |

### Entity: PayPeriod
- **Table**: `hs_hr_payperiod`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | string(13) | PK | | |
  |  | string(100) |  | | |

### Entity: ReportingMethod
- **Table**: `ohrm_emp_reporting_method`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | integer(7) | PK | | |
  |  | string(100) | Not Null | | |

### Entity: ReportTo
- **Table**: `hs_hr_emp_reportto`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|

### Entity: TerminationReason
- **Table**: `ohrm_emp_termination_reason`
- **Fields**:
  | Field | Type | Constraint | Default | Note |
  |---|---|---|---|---|
  |  | integer(4) | PK | | |
  |  | string(100) | Not Null | | |

