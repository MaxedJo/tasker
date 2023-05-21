delete
from change
where task_id = 50;

insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2023-04-10 10:20:00', 'NONE', '', '', 50),
       (2, '2023-04-10 10:21:00', 'USER', 'Петров', 'Не назначено', 50),
       (2, '2023-04-15 10:21:01', 'STATUS', 'OPENED', '', 50),
       (28, '2023-04-15 10:23:00', 'STATUS', 'WORKING', 'OPENED', 50),
       (28, '2023-04-20 10:10:20', 'STATUS', 'TESTING', 'WORKING', 50),
       (2, '2023-04-20 10:20:00', 'STATUS', 'CLOSED', 'TESTING', 50);

delete
from message
where task_id = 50;
insert into message (author_id, local_date_time, task_id, text)
VALUES (28, '2023-04-20 09:10:00', 50, 'проверяйте')
;
