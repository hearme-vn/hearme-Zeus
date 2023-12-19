/**
 * @license hearme
 * @copyright 2017-2020 https://hearme.vn
 * @author Thuc VX <thuc@hearme.vn>
 * @date 2 Apr 2020
 * @purpose A consts to define all api's URI
 */
export const URIS = {
  // IAM
  auth: {
    login: 'auth/login',
    logout: '',
    reset: '',

    user_infomation: 'user/info',
    update_user_info: 'user/update',
    permissionList: 'user/permissions/{org_id}',
    deviceResecret: 'device/resecret/',
    changePasswd: 'auth/password/change',
    loginBarCode: 'auth/get_permanent_token'
  },

  // Main API
  main: {
    // User API


    // General APIS
    v145RoleList: 'v145/role/list',
    synchronize_customer: 'customer/sending_feedback',
    object_emit_event: 'v201/object_emit_event',
    business_fields_list: 'business_field/list',

    // Device management api
    device_list: 'v145/device/list',
    device_update:  'device/update',
    device_link_create:  'link/create',
    device_delete:  'device/delete/{id}',

    // Organization management APIs
    personal_organization_update: '/organization/update',
    organization_info: 'v200/organization/info',
    organization_update_feedback_count: 'organization/update_feedback_count',   // Update feedback count to organization
    organization_create: 'v145/organization/create',
    organization_update: 'v145/organization/update',

    // Customer list
    customer_list: 'customer/list',
    customer_create: 'customer/create',
    customer_update: 'customer/update',

    // Dashboard API
    email_counting_by_time_series: 'dashboard/email_counting_by_time_series',
    customer_counting_by_time_series: 'dashboard/customer_counting_by_time_series',
    total_object_counting: 'dashboard/total_object_counting',

    // Notify API
    notify_list: 'uc_notifications/list',
    notify_count:  'uc_notifications/count',
    notify_detail:  'uc_notifications/detail',
    notify_update:  'uc_notifications/update',
    notify_delete:  'uc_notifications/delete',    // Post method

    // For survey management
    survey_list:    'v145/survey/list',
    survey_create:  'survey/create',
    survey_update:  'v145/survey/update',
    survey_delete:  'survey/delete/{id}',
    survey_info:    'v1.3/survey/info/{id}',
    survey_tree:    'survey/tree',
    survey_childList:    'survey/child_list',
    survey_delete_child: 'survey/removechild/{id}',   // Relation id
    survey_update_child: 'survey/update_child',
    survey_v3_update: 'v3/survey/update',
    survey_v3_delete:  'v3/survey/delete',
    survey_v3_set_status:  'v3/survey/set_status',
    survey_add_child: 'survey/setchild',
    survey_export:    'survey/tree/export',
    survey_import:    'survey/tree/import',

    // For survey template
    survey_template_list:    'survey_template/list',
    survey_template_export_survey:    'survey_template/export_survey',
    survey_template_survey_tree:      'survey_template/survey_tree',

    // Config management
    configure_create: 'config/create',
    configure_update: 'config/update',
    // configure_delete: '',
    configure_list: 'config/list',

    // Group API
    group_list: 'v145/group/list',
    group_create:  'group/create',
    group_update:  'group/update',
    group_delete:  'group/delete/{id}',
    group_survey:  'group/survey/',

    // Collection API
    collection_list: 'v145/collection/list',
    collection_create:  'collection/create',
    collection_update:  'collection/update',
    collection_info: 'collection/info/{id}',
    collection_delete: 'collection/delete/{id}',
    collection_posts: 'collection/post/{id}/{status}',

    // Image API
    image_list: 'collection/post/{id}/0',
    image_create:  'post/create',
    image_update:  'post/update',
    image_delete:  'post/delete',

    // Theme API
    theme_list: 'theme/list',
    theme_create: 'theme/create',
    theme_update: 'theme/update',
    theme_delete: 'theme/delete/{id}',
    themetype_list: 'themetype/list',

    // target API
    target_list: 'target/list',
    target_create:  'target/create',
    target_update:  'target/update',
    target_delete:  'target/delete/{id}',

    // label
    label_create:       'label/create',
    label_update:       'label/update',
    label_list:         'label/list',
    label_info:         'label/info/{id}',
    label_delete:       'label/delete/{id}',
    label_list_model:   'label/list/{table}/{column}/{id}',

    // tab
    tabs_create: 'tabs/create',
    tabs_update: 'tabs/update',
    tabs_list:   'tabs/byObject/{id}',

    // Plugin
    plugin_create: 'plugin/create',
    plugin_update: 'plugin/update',
    plugin_list: 'plugin/list',

  },


  // Datafront APIs
  front: {
    // Counting feedbaks in organization
    update_organization_feedback_count: 'organization/update_feedback_count',

    // For Dashboard statistics
    total_fbcount_bytimes: 'total_fbcount_bytimes',
    fbcount_count_by_status: 'feedback/count_by_status',
    fbcount_count_by_groups: 'feedback/count_by_groups',
    fbcount_count_by_devices: 'feedback/count_by_devices',
    fbcount_count_by_surveys: 'feedback/count_by_surveys',

    // For feedback
    correlation_cofficient: 'survey/correl',

    // For survey statistics
    statistics: 'v145/survey/statistics',
    count_factor_feedback: 'v250/survey/factorcount'    // Apply for single selection

  },

  // Data User APIs
  user: {
    feedback_list: 'feedback/list',

  },

  // Data oauth APIs
  oauth: {
    // Device API
    device_create:  'device/create',
    device_delete:  'device/delete/',
    deviceInviteToken: 'device/invite_token',
  },

  // Data socket APIs
  socket: {
    // Device API
    deviceAction: '/socket/device/{action}/{id}',
    // Group API
    groupAction: '/socket/group/{action}/{id}'
  }
};
