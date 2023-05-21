delete
from change
where task_id = 55;

insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2023-05-07 10:20:00', 'NONE', '', '', 55),
       (2, '2023-05-07 10:21:00', 'USER', 'Иванов Александр Иванович', 'Не назначено', 55),
       (2, '2023-05-07 10:21:00', 'DEADLINE', '2023-06-30', '', 55),
       (2, '2023-05-07 10:21:01', 'STATUS', 'OPENED', '', 55),
       (2, '2023-05-07 10:21:01', 'STATUS', 'OPENED', '', 55)
;
delete
from message
where task_id = 55;
