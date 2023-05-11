package ru.vorobev.tasker.mapper;

import org.mapstruct.*;
import ru.vorobev.tasker.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "authorities", ignore = true)
    void updateCustomerFromDto(User dto, @MappingTarget User entity);
}
