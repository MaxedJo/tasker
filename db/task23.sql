delete
from change
where task_id = 23;

insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2022-12-05 10:00:00', 'NONE', '', '', 23);
insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2022-12-05 10:10:00', 'USER', 'Роман Светлов', 'Не назначено', 23);
insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2022-12-05 10:10:01', 'STATUS', 'OPENED', '', 23);
insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (33, '2022-12-05 10:10:01', 'STATUS', 'WORKING', 'OPENED', 23);
insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (33, '2023-01-05 14:09:00', 'FILE_ADD', 'Bank.zip', '', 23);
insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (33, '2023-01-05 14:10:00', 'STATUS', 'TESTING', 'WORKING', 23);
insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2023-01-05 22:10:00', 'STATUS', 'WORKING', 'TESTING', 23);
insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (33, '2023-01-09 11:08:00', 'FILE_DELETE', '', 'Bank.zip', 23);
insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (33, '2023-01-09 11:09:00', 'FILE_ADD', 'Bank.zip', '', 23);
insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (33, '2023-01-09 11:10:00', 'STATUS', 'TESTING', 'WORKING', 23);
insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2023-01-09 18:40:00', 'STATUS', 'CLOSED', 'TESTING', 23);

delete
from message
where task_id = 23;
insert into message (author_id, local_date_time, task_id, text)
VALUES (33, '2022-12-05 10:20:01', 23, 'Какой стиль предпочитает клиент?');
insert into message (author_id, local_date_time, task_id, text)
VALUES (2, '2022-12-05 10:33:01', 23, 'Давай строго деловой. Без особых кричащих элементов. Но с учетом их цветов');
insert into message (author_id, local_date_time, task_id, text)
VALUES (33, '2022-12-05 10:21:21', 23, 'понял');
insert into message (author_id, local_date_time, task_id, text)
VALUES (33, '2023-01-09 11:08:00', 23, 'Загрузил макет. Проверьте');
insert into message (author_id, local_date_time, task_id, text)
VALUES (2, '2023-01-05 22:10:00', 23, 'На главной блок формы слишком отступы большие');
insert into message (author_id, local_date_time, task_id, text)
VALUES (33, '2023-01-09 11:10:00', 23, 'Исправил. Загрузил макет. Проверьте');