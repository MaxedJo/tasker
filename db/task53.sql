delete
from change
where task_id = 53;

insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2023-05-07 10:20:00', 'NONE', '', '', 53),
       (2, '2023-05-07 10:21:00', 'USER', 'Иванов А', 'Не назначено', 53),
       (2, '2023-05-07 10:21:00', 'DEADLINE', '2023-06-02', '', 53),
       (2, '2023-05-07 10:21:01', 'STATUS', 'OPENED', '', 53),
       (28, '2023-05-07 10:23:00', 'STATUS', 'WORKING', 'OPENED', 53)
;
delete
from message
where task_id = 53;
