delete
from change
where task_id = 42;

insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2023-01-20 10:20:00', 'NONE', '', '', 42),
       (2, '2023-01-20 10:21:00', 'USER', 'Иванов А', 'Не назначено', 42),
       (2, '2023-01-20 10:21:01', 'STATUS', 'OPENED', '', 42),
       (28, '2023-01-21 14:19:00', 'STATUS', 'WORKING', 'OPENED', 42),
       (28, '2023-01-25 14:10:00', 'STATUS', 'TESTING', 'WORKING', 42),
       (2, '2023-01-25 18:20:00', 'STATUS', 'CLOSED', 'TESTING', 42);

delete
from message
where task_id = 42;
insert into message (author_id, local_date_time, task_id, text)
VALUES (28, '2023-01-20 10:21:01', 42, 'Берем редакцию Малый бизнес?'),
       (34, '2023-01-20 10:28:00', 42, 'Да'),
       (2, '2023-01-20 10:29:00', 42, 'Согласен'),
       (28, '2023-01-25 14:09:00', 42, 'Готово. Принимайте')
;
