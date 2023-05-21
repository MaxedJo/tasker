delete
from change
where task_id = 51;

insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2023-02-20 10:20:00', 'NONE', '', '', 51),
       (2, '2023-02-20 10:21:00', 'USER', 'Петров', 'Не назначено', 51),
       (2, '2023-02-20 10:21:01', 'STATUS', 'OPENED', '', 51),
       (31, '2023-02-20 10:23:00', 'STATUS', 'WORKING', 'OPENED', 51),
       (31, '2023-04-25 10:10:20', 'STATUS', 'TESTING', 'WORKING', 51),
       (2, '2023-04-25 10:20:00', 'STATUS', 'WORKING', 'TESTING', 51),
       (31, '2023-04-25 12:10:20', 'STATUS', 'TESTING', 'WORKING', 51),
       (2, '2023-04-28 10:20:00', 'STATUS', 'CLOSED', 'TESTING', 51);

delete
from message
where task_id = 51;
insert into message (author_id, local_date_time, task_id, text)
VALUES (31, '2023-04-20 09:10:00', 51, 'проверяйте'),
       (2, '2023-04-25 12:10:20', 51, 'Опечатка в форме, не сохраняется имя автора сообщения'),
       (31, '2023-04-28 09:20:00', 51, 'Исправил')
;
