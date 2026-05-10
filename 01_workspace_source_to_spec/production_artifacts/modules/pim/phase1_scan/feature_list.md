# Feature List: PIM

| Feature ID | Feature Name | Action/API | Actors | Source Trace | Note |
|---|---|---|---|---|---|
| F-001 | apiv2_pim_employee | GET, PUT /api/v2/pim/employees/{empNumber} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-002 | apiv2_pim_employees | GET, POST, DELETE /api/v2/pim/employees | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-003 | apiv2_pim_employees_count | GET /api/v2/pim/employees/count | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-004 | apiv2_pim_employee_picture | GET, PUT /api/v2/pim/employees/{empNumber}/picture | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-005 | apiv2_pim_employee_custom_fields | GET, PUT /api/v2/pim/employees/{empNumber}/custom-fields | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-006 | apiv2_pim_employees_personal_details | GET, PUT /api/v2/pim/employees/{empNumber}/personal-details | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-007 | apiv2_pim_employees_job_details | GET, PUT /api/v2/pim/employees/{empNumber}/job-details | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-008 | apiv2_pim_employees_job_employment_contract | GET, PUT /api/v2/pim/employees/{empNumber}/employment-contract | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-009 | apiv2_pim_employees_termination | GET, PUT /api/v2/pim/employees/{empNumber}/terminations/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-010 | apiv2_pim_employees_terminations | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/terminations | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-011 | apiv2_pim_employee_contact_details | GET, PUT /api/v2/pim/employee/{empNumber}/contact-details | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-012 | apiv2_pim_employees_dependent | GET, PUT /api/v2/pim/employees/{empNumber}/dependents/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-013 | apiv2_pim_employees_dependents | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/dependents | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-014 | apiv2_pim_employees_salary_component | GET, PUT /api/v2/pim/employees/{empNumber}/salary-components/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-015 | apiv2_pim_employees_salary_components | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/salary-components | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-016 | apiv2_pim_employees_attachment | GET, PUT /api/v2/pim/employees/{empNumber}/screen/{screen}/attachments/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-017 | apiv2_pim_employees_attachments | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/screen/{screen}/attachments | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-018 | apiv2_pim_employee_emergency_contact | GET, PUT /api/v2/pim/employees/{empNumber}/emergency-contacts/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-019 | apiv2_pim_employee_emergency_contacts | GET, POST , DELETE /api/v2/pim/employees/{empNumber}/emergency-contacts | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-020 | apiv2_pim_employees_skills | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/skills | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-021 | apiv2_pim_employees_allowed_skills | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/skills/allowed | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-022 | apiv2_pim_employees_skill | GET, PUT /api/v2/pim/employees/{empNumber}/skills/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-023 | apiv2_pim_employees_educations | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/educations | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-024 | apiv2_pim_employees_education | GET, PUT /api/v2/pim/employees/{empNumber}/educations/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-025 | apiv2_pim_employees_languages | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/languages | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-026 | apiv2_pim_employees_language | GET, PUT /api/v2/pim/employees/{empNumber}/languages/{languageId}/fluencies/{fluencyId} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-027 | apiv2_pim_employees_allowed_languages | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/languages/allowed | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-028 | apiv2_pim_employees_work_experiences | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/work-experiences | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-029 | apiv2_pim_employees_work_experience | GET, PUT /api/v2/pim/employees/{empNumber}/work-experiences/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-030 | apiv2_pim_employees_licenses | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/licenses | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-031 | apiv2_pim_employees_allowed_licenses | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/licenses/allowed | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-032 | apiv2_pim_employees_license | GET, PUT /api/v2/pim/employees/{empNumber}/licenses/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-033 | apiv2_pim_termination_reason | GET, PUT /api/v2/pim/termination-reasons/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-034 | apiv2_pim_termination_reasons | GET, POST, DELETE /api/v2/pim/termination-reasons | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-035 | apiv2_pim_reporting_method | GET, PUT /api/v2/pim/reporting-methods/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-036 | apiv2_pim_reporting_methods | GET, POST, DELETE /api/v2/pim/reporting-methods | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-037 | apiv2_pim_custom_fields | GET, POST, DELETE /api/v2/pim/custom-fields | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-038 | apiv2_pim_custom_field | GET, PUT /api/v2/pim/custom-fields/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-039 | apiv2_pim_optional_field | GET, PUT /api/v2/pim/optional-field | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-040 | apiv2_pim_employees_immigration | GET, PUT /api/v2/pim/employees/{empNumber}/immigrations/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-041 | apiv2_pim_employees_immigrations | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/immigrations | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-042 | apiv2_pim_report_to_supervisors | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/supervisors | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-043 | apiv2_pim_report_to_supervisor | GET, PUT /api/v2/pim/employees/{empNumber}/supervisors/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-044 | apiv2_pim_report_to_subordinate | GET, PUT /api/v2/pim/employees/{empNumber}/subordinates/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-045 | apiv2_pim_report_to_subordinates | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/subordinates | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-046 | apiv2_pim_report_to_allowed_employees | GET /api/v2/pim/employees/{empNumber}/report-to/allowed | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-047 | apiv2_pim_employees_memberships | GET, POST, DELETE /api/v2/pim/employees/{empNumber}/memberships | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-048 | apiv2_pim_employees_membership | GET, PUT /api/v2/pim/employees/{empNumber}/memberships/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-049 | apiv2_pim_employees_us_tax_exemption | GET, PUT /api/v2/pim/employees/{empNumber}/tax-exemption | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-050 | apiv2_pim_employees_work_shift | GET /api/v2/pim/employees/{empNumber}/work-shift | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-051 | apiv2_pim_employees_import | POST /api/v2/pim/csv-import | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-052 | apiv2_pim_reports | GET /api/v2/pim/reports | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-053 | apiv2_pim_reports_data | GET /api/v2/pim/reports/data | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-054 | apiv2_pim_defined_reports | GET, POST, DELETE /api/v2/pim/reports/defined | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-055 | apiv2_pim_defined_report | GET, PUT /api/v2/pim/reports/defined/{id} | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-056 | apiv2_pim_update_password | PUT /api/v2/pim/update-password | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-057 | apiv2_pim_validate_employee_email | GET /api/v2/pim/employees/{empNumber}/contact-details/validation/work-emails | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-058 | apiv2_pim_validate_employee_other_email | GET /api/v2/pim/employees/{empNumber}/contact-details/validation/other-emails | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-059 | apiv2_pim_my_info | GET /api/v2/pim/myself | Admin | `Core\Controller\Rest\V2\GenericRestController::handle` | |
| F-060 | pim_employee_picture | GET /pim/viewPhoto/empNumber/{empNumber} | ESS, Admin | `Pim\Controller\File\EmployeePictureController::handle` | |
| F-061 | pim_employee_attachment | GET /pim/viewAttachment/empNumber/{empNumber}/attachId/{attachId} | ESS, Admin | `Pim\Controller\File\EmployeeAttachmentController::handle` | |
| F-062 | pim_employee_csv_import_sample_attachment | GET /pim/sampleCsvDownload | ESS, Admin | `Pim\Controller\File\EmployeeCsvImportSampleAttachmentController::handle` | |
| F-063 | pim_module | GET /pim/viewPimModule | ESS, Admin | `Pim\Controller\PimModuleController::handle` | |
| F-064 | pim_view_my_details | GET /pim/viewMyDetails | ESS, Admin | `Pim\Controller\ViewMyDetailsController::handle` | |
| F-065 | pim_view_employee_list | GET /pim/viewEmployeeList | ESS, Admin | `Pim\Controller\EmployeeController::handle` | |
| F-066 | pim_add_employee | GET /pim/addEmployee | ESS, Admin | `Pim\Controller\SaveEmployeeController::handle` | |
| F-067 | pim_employee_personal_details | GET /pim/viewPersonalDetails/empNumber/{empNumber} | ESS, Admin | `Pim\Controller\EmployeePersonalDetailController::handle` | |
| F-068 | pim_employee_contact_details | GET /pim/contactDetails/empNumber/{empNumber} | ESS, Admin | `Pim\Controller\EmployeeContactDetailsController::handle` | |
| F-069 | pim_employee_emergency_contacts | GET /pim/viewEmergencyContacts/empNumber/{empNumber} | ESS, Admin | `Pim\Controller\EmployeeEmergencyContactsController::handle` | |
| F-070 | pim_employee_dependents | GET /pim/viewDependents/empNumber/{empNumber} | ESS, Admin | `Pim\Controller\EmployeeDependentsController::handle` | |
| F-071 | pim_employee_salary | GET /pim/viewSalaryList/empNumber/{empNumber} | ESS, Admin | `Pim\Controller\EmployeeSalaryController::handle` | |
| F-072 | pim_employee_profile_picture | GET /pim/viewPhotograph/empNumber/{empNumber} | ESS, Admin | `Pim\Controller\EmployeeProfilePictureController::handle` | |
| F-073 | pim_employee_job | GET /pim/viewJobDetails/empNumber/{empNumber} | ESS, Admin | `Pim\Controller\EmployeeJobController::handle` | |
| F-074 | pim_employee_qualifications | GET /pim/viewQualifications/empNumber/{empNumber} | ESS, Admin | `Pim\Controller\EmployeeQualificationsController::handle` | |
| F-075 | pim_employee_report_to | GET /pim/viewReportToDetails/empNumber/{empNumber} | ESS, Admin | `Pim\Controller\EmployeeReportToController::handle` | |
| F-076 | view_termination_reason | GET /pim/viewTerminationReasons | ESS, Admin | `Pim\Controller\TerminationReasonController::handle` | |
| F-077 | save_termination_reason | GET /pim/saveTerminationReasons | ESS, Admin | `Pim\Controller\SaveTerminationReasonController::handle` | |
| F-078 | edit_termination_reason | GET /pim/saveTerminationReasons/{id} | ESS, Admin | `Pim\Controller\SaveTerminationReasonController::handle` | |
| F-079 | view_reporting_method | GET /pim/viewReportingMethods | ESS, Admin | `Pim\Controller\ReportingMethodController::handle` | |
| F-080 | save_reporting_method | GET /pim/saveReportingMethod | ESS, Admin | `Pim\Controller\SaveReportingMethodController::handle` | |
| F-081 | edit_reporting_method | GET /pim/saveReportingMethod/{id} | ESS, Admin | `Pim\Controller\SaveReportingMethodController::handle` | |
| F-082 | view_custom_fields | GET /pim/listCustomFields | ESS, Admin | `Pim\Controller\CustomFieldController::handle` | |
| F-083 | save_custom_fields | GET /pim/saveCustomFields | ESS, Admin | `Pim\Controller\SaveCustomFieldController::handle` | |
| F-084 | edit_custom_fields | GET /pim/saveCustomFields/{id} | ESS, Admin | `Pim\Controller\SaveCustomFieldController::handle` | |
| F-085 | view_optional_field | GET /pim/configurePim | ESS, Admin | `Pim\Controller\OptionalFieldController::handle` | |
| F-086 | pim_employee_immigration | GET /pim/viewImmigration/empNumber/{empNumber} | ESS, Admin | `Pim\Controller\EmployeeImmigrationController::handle` | |
| F-087 | pim_employee_membership | GET /pim/viewMemberships/empNumber/{empNumber} | ESS, Admin | `Pim\Controller\EmployeeMembershipController::handle` | |
| F-088 | pim_employee_tax_exemption | GET /pim/viewUsTaxExemptions/empNumber/{empNumber} | ESS, Admin | `Pim\Controller\EmpUsTaxExemptionController::handle` | |
| F-089 | pim_employee_csv_import | GET /pim/pimCsvImport | ESS, Admin | `Pim\Controller\EmployeeCsvImportController::handle` | |
| F-090 | pim_view_employee_reports | GET /pim/viewDefinedPredefinedReports | ESS, Admin | `Pim\Controller\EmployeeReportController::handle` | |
| F-091 | pim_save_employee_reports | GET /pim/definePredefinedReport | ESS, Admin | `Pim\Controller\SaveEmployeeReportController::handle` | |
| F-092 | pim_edit_employee_reports | GET /pim/definePredefinedReport/{id} | ESS, Admin | `Pim\Controller\SaveEmployeeReportController::handle` | |
| F-093 | pim_display_employee_report | GET /pim/displayPredefinedReport/{id} | ESS, Admin | `Pim\Controller\EmployeeReportController::handle` | |
| F-094 | update_password | GET /pim/updatePassword | ESS, Admin | `Pim\Controller\UpdatePasswordController::handle` | |
