delete
from change
where task_id = 49;

insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2023-04-10 10:20:00', 'NONE', '', '', 49),
       (2, '2023-04-10 10:21:00', 'USER', 'Петров', 'Не назначено', 49),
       (2, '2023-04-10 10:21:00', 'DEADLINE', '2023-04-20', '', 49),
       (2, '2023-04-15 10:21:01', 'STATUS', 'OPENED', '', 49),
       (31, '2023-04-15 10:23:00', 'STATUS', 'WORKING', 'OPENED', 49),
       (31, '2023-04-20 10:10:20', 'STATUS', 'TESTING', 'WORKING', 49),
       (2, '2023-04-20 10:20:00', 'STATUS', 'CLOSED', 'TESTING', 49);

delete
from message
where task_id = 49;
insert into message (author_id, local_date_time, task_id, text)
VALUES (31, '2023-04-20 10:10:00', 49, 'Готово - проверяйте')
;
